/* Variables */

/* Modals */
const create_message_modal = document.querySelector('.create_message_modal');
const remove_message = document.querySelector('.remove_message');
const remove_comment = document.querySelector('.remove_comment');
const new_message_textarea = document.querySelector('.new_message_textarea');
const modal_board = document.querySelectorAll('.modal_board');

/* Close Modal Buttons */
const close_modal = document.querySelectorAll('.close_modal');
const post_button = document.querySelector('.post_button');

/* Containers */
const message_item = document.querySelector('.message_item');
const message_container = document.getElementById('message_container');

/* Initial Primary key for each message and comment */
let message_id=1 , comment_id =1;


/* -------- Event Listener ----------- */

/* trigger to show create message modal */
document.getElementById('create_message_button').addEventListener('click', function(){
    showElement(create_message_modal);
});

/* hide modal when click cancel or close button */
for(let hide_modal_trigger = 0; hide_modal_trigger < close_modal.length; hide_modal_trigger++){
    close_modal[hide_modal_trigger].addEventListener('click', function(event){
        event.preventDefault();
        hideElement(event.target.closest(".modal"));
        resetValue(post_button,new_message_textarea);
    });
}
/* Event listener to check if textarea have any text */
new_message_textarea.addEventListener('keyup', function(event){
    checkTextArea(event,post_button);
});

/* trigger a new message everytime you click */
post_button.addEventListener('click', function(event){
    event.preventDefault();
    createMessage(new_message_textarea.value);
    resetValue(post_button,new_message_textarea);
    hideElement(create_message_modal);
});

/* Event Listener whenever delete button has been click */
for(let remove_item_index = 0; remove_item_index < modal_board.length; remove_item_index++){
    modal_board[remove_item_index].addEventListener('submit', function(event){
    let delete_form = event.target.closest('.modal').classList;
    if(delete_form.contains('remove_message')){
        deleteSelectedMessage(event);
    }
    else{
        deleteSelectedComment(event);
    }
});
}

/* -------- Functions ----------- */

/**
* DOCU: It creates a new message, adds event listeners to the buttons, and prepends the message to the message container. <br>
* Triggered: When post_button function is triggered by user who entered a character in modal textarea.<br>
* @function
* @param {string} content - the message that the user has typed in the create new message textarea
* @author Jp
*/
function createMessage(content){
    /* This is where we clone the message element everytime the user create a new message. The content is the message 
    that the user has typed in the textarea and it will be stored in P tag */
    let cloned_item = message_item.cloneNode(true);
        cloned_item.classList.remove('hide');
        cloned_item.querySelector('.message_content p').innerText = content;
    
   /*  Data-message-id will be use as a storage to store primary key */
    cloned_item.setAttribute('data-message-id',message_id);

    /* Codes below are use to select the elements from the cloned messages */
    let update_button = cloned_item.querySelector('.update_button');
    let edit_container = cloned_item.querySelector('.edit_container');
    let comment_form = cloned_item.querySelector('.comment_form');
    let post_comment_button = comment_form.querySelector('.post_comment_button');
    let button_box = cloned_item.querySelector('.buttons');

    /* trigger to show or hide comment */
    button_box.querySelector('.comment').addEventListener('click', function(){showHideCommentTextArea(comment_form)});

    /* trigger to check if textarea comment is empty */
    comment_form.querySelector('textarea').addEventListener('keyup', function(event){checkTextArea(event,post_comment_button)});

    /* trigger to show delete modal */
    button_box.querySelector('.delete').addEventListener('click', function(){showDelete(cloned_item)});

    /* Event Listener whenever a user click post comment button */
    cloned_item.querySelector('.comment_form').addEventListener('submit', function(event){addComment(event)});

    /* trigger to show editable textarea */
    button_box.querySelector('.edit').addEventListener('click', function(){showEdit(button_box,cloned_item)});

    /* trigger to check if textarea in edit form is empty */
    edit_container.querySelector('textarea').addEventListener('keyup', function(event){checkTextArea(event,update_button)});

    /* trigger when the user submit the updated message he typed */
    edit_container.addEventListener('submit', function(event){updateMessage(event, cloned_item, button_box)});

    /* All new cloned items will be prepend inside message_container */
    message_container.prepend(cloned_item);
    messageCounter();

    /* The initial Primary key will increase by 1 everytime user post another message, this will ensure the id will be unique */
    message_id++;
}

/**
* This function will show delete modal, it will be check first if it's under comment or message area.<br>
* Triggered: When user clicked delete button in comment/message buttons container.  
* @function
* @param {object} cloned_item - The selected content that will be filter if it's under message or comment.
* @author Jp
*/
function showDelete(cloned_item){
    if(cloned_item.classList.contains('message_item')){
        remove_message.querySelector('input').value = cloned_item.getAttribute('data-message-id');
        showElement(remove_message);
    }
    else{
        remove_comment.querySelector('input').value = cloned_item.getAttribute('data-comment-id');
        showElement(remove_comment);
    }
}

/**
* It takes a button box and a clone of the message/comment container as arguments, <br>
* and then it hides the button container and shows the edit message container.  <br>
* Triggered: When user clicked edit button in comment/message buttons container.  
* @function
* @param {object} button_box - The container that holds the buttons for edit delete and the username.
* @param {object} content - The clone of the message/comment that is being edited.
* @author Jp
*/
function showEdit(button_box,content){
    /* Selectors to select elements in the cloned message that is going to edit */
    let edit_container = content.querySelector('.edit_container');
    let edit_textarea = edit_container.querySelector('textarea');
    let message_content = content.querySelector('.message_content');
    let message = message_content.querySelector('p').innerText;
    edit_textarea.value = message;

    /* Hide and show necessary element to make it look like it's being edited */
    hideElement(button_box);
    hideElement(message_content);
    showElement(edit_container);

    /* event listener inside edit to check if the user click cancel */
    edit_container.querySelector('.cancel_update_button').addEventListener('click',function(){
        hideElement(edit_container);
        showElement(message_content);
        showElement(button_box);
    });
}

/**
* It takes a button box,message container and event as arguments, <br>
* and then it hides the button container and shows the updated text in P tag.  <br>
* Triggered: When user clicked submit button in edit message/comment container.  
* @function
* @param {object} event - The event trigger everytime a submit has been click inside the form.
* @param {object} message_container - message container that will be visible after the event.
* @param {object} button_box - The container that holds the buttons for edit delete and the username.
* @author Jp
*/
function updateMessage(event, message_container, button_box){
    event.preventDefault();

    /* Getting the value of the textarea, the parent container, the message content, and the message paragraph. */
    let edit_container = message_container.querySelector('.edit_container');
    let message_content = message_container.querySelector('.message_content');
    const textarea_value = edit_container.querySelector('.edit_textarea').value;
    const message_paragraph = message_content.querySelector('p');

    /* the new value of paragraph tag will be whatever the user typed in the textarea */
    message_paragraph.innerText = textarea_value;

    /* Hide and show necessary element after the edit has been made*/
    showElement(message_content);
    showElement(button_box);
    hideElement(edit_container);
}

/* Updates message_counter span count after adding/deleting messages */
function messageCounter(){
    let message_count = message_container.children.length -2;
    document.getElementById('message_counter').innerText = message_count;

    /* condition to check if the empty icon will be visible or not */
    if(message_count > 0){
        hideElement(document.querySelector('.empty_message_container'));
    }
    else{
        showElement(document.querySelector('.empty_message_container'));
    }
}

/**
* It updates the comment count based from the number of child in comment container. <br>
* and then it change the icon of comment if its no longer empty. <br>
* Triggered: When user clicked submit button in post comment container.  
* @function
* @param {object} selected_comment - The clone of the parent element of comment to count all children it have.
* @author Jp
*/
function commentCounter(selected_comment){

    /* Codes below are use to select the elements from the cloned comments */
    let comment_count = selected_comment.querySelector('.comment_container').children.length;
    let counter = selected_comment.querySelector('.comment_counter')
    let comment_button = selected_comment.querySelector('.comment');
    let comment_icon = selected_comment.querySelector('span');

    /* condition to check if the parent element of comment has a child, then change the icon comment if yes */
    if(comment_count > 0){
        comment_icon.classList.add('has_comment');
        comment_icon.classList.remove('no_comment');  
        comment_button.classList.add('colored');
    }
    else{
        comment_icon.classList.add('no_comment');
        comment_icon.classList.remove('has_comment');  
        comment_button.classList.remove('colored');
    }
    /* show the number of children base on comment counts */
    counter.innerText = comment_count;
}

/* Adds show class to element and remove hide to change display value */
function showElement(element){
    element.classList.add('show');
    element.classList.remove('hide');
}

/* Adds hide class to element and remove show to change display value */
function hideElement(element){
    element.classList.add('hide');
    element.classList.remove('show');
}

/* Reset form by removing all text in textarea and set button to become disabled */
function resetValue (button,textarea){
    textarea.value = '';
    button.disabled = true;
    button.classList.add('disabled');
}

/* Function for deleting message everytime the user submit `Delete Message` Button */
function deleteSelectedMessage(event){
    event.preventDefault();
    let clone_id = event.target[0].value;
    let selected_clone='';
    selected_clone = message_container.querySelector(`li[data-message-id="${clone_id}"]`);
    selected_clone.closest("#message_container").removeChild(selected_clone);
    hideElement(remove_message);
    messageCounter();
}

/* Function for deleting comments everytime the user submit `Delete Comment` Button */
function deleteSelectedComment(event){
    event.preventDefault();
    let clone_id = event.target[0].value;
    let selected_clone='';
    selected_clone = message_container.querySelector(`li[data-comment-id="${clone_id}"]`);
    let comment_container = selected_clone.closest('.comment_container');
    comment_container.removeChild(selected_clone);
    hideElement(remove_comment);
    commentCounter(comment_container.closest(".message_item")); 
}

T/* This function will check all textarea to see if it meets the criteria before allowing to add a message or comment */
function checkTextArea(event, post_button){
    let textarea_length = event.target.value.length;
    if(textarea_length>0){
        post_button.disabled = false;
        post_button.classList.remove('disabled');
    }
    else{
        post_button.classList.add('disabled');
        post_button.disabled = true;
    }
}

/* Show and hide comment form */
function showHideCommentTextArea(comment_form){
    let class_list = comment_form.classList;
    let comment_container = comment_form.closest('.message_item').querySelector('.comment_container');
    if(class_list.contains('hide')){
        showElement(comment_form);
        showElement(comment_container);
    }
    else{
        hideElement(comment_form);
        hideElement(comment_container);
    }
}

/**
* Function that clones comments item, removes the hide class from the clone, and then prepends the clone to the comment_container. <br>
* Triggered: When user clicked "Post Comment" button. <br>
* @function
* @param {object} event - all user's input in the post comment textarea is inside this event.
* @author Jp
*/
function addComment(event){
    event.preventDefault();

    /* This is where we clone the comment elements everytime the user create a new comment. The event is the content
    that the user has typed in the textarea and it will be stored in P tag */
    let comment_clone = document.querySelector('.comment_item').cloneNode(true);
        comment_clone.setAttribute('data-comment-id', comment_id);
        comment_clone.querySelector('.message_content p').innerText = event.target[0].value;

    /* The code is selecting the elements from the comment_clone. */
    let selected_message = event.target.closest('.message_item');
    let post_comment_button = selected_message.querySelector('.post_comment_button')
    let comment_form_textarea = selected_message.querySelector('.comment_form .comment_form_textarea');
    let comment_container = selected_message.querySelector('.comment_container');
    let button_box = comment_clone.querySelector('.buttons');
    let edit_container = comment_clone.querySelector('.edit_container');
    let update_button = comment_clone.querySelector('.update_button');

    /* The code below is event listeners to the buttons and textarea. */
    button_box.querySelector('.delete').addEventListener('click', function(){showDelete(comment_clone)});
    button_box.querySelector('.edit').addEventListener('click', function(){showEdit(button_box,comment_clone)});
    edit_container.querySelector('.edit_textarea').addEventListener('keyup', (event)=>checkTextArea(event, update_button));
    edit_container.addEventListener('submit', function(event){updateMessage(event, comment_clone, button_box)});

    /* All cloned comments that is created will be prepend inside comment_container */
    comment_container.prepend(comment_clone);

    /* Resetting the form and updating the comment count. */
    resetValue(post_comment_button,comment_form_textarea);
    showElement(comment_clone);
    showElement(comment_container);
    commentCounter(selected_message);

    /* The initial Primary key will increase by 1 everytime user add another comment, this will ensure the id will be unique */
    comment_id++;
}

