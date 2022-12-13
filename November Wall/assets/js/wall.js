/* variables */
const create_message_button = document.getElementById('create_message_button');
const close_modal = document.querySelectorAll('.close_modal');
const close_modal_button = document.querySelectorAll('.close_modal_button');
const delete_button = document.querySelectorAll('.delete_button');
const post_button = document.querySelector('.post_button');
const create_message_modal = document.querySelector('.create_message_modal');
const new_message_textarea = document.querySelector('.new_message_textarea');
const message_item = document.querySelector('.message_item');
const comment_item = document.querySelector('.comment_item');
const empty_message_container = document.querySelector('.empty_message_container');
const message_counter = document.getElementById('message_counter');
const message_container = document.getElementById('message_container');
const remove_message = document.querySelector('.remove_message');
const remove_comment = document.querySelector('.remove_comment');
const modal_board = document.querySelectorAll('.modal_board');
const cancel_button = document.querySelectorAll('.cancel_button');
let message_id=1 , comment_id =1;
/* trigger to show create message modal */
create_message_button.addEventListener('click', function(){
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
    modal_board[remove_item_index].addEventListener('submit', function(event){deleteSelectedItem(event)});
}



/* functions */
function createMessage(content){
    let cloned_item = message_item.cloneNode(true);
        cloned_item.classList.remove('hide');
        cloned_item.querySelector('.message_content p').innerText = content;
    
    cloned_item.setAttribute('data-message-id',message_id);

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

    edit_container.addEventListener('submit', function(event){updateMessage(event, cloned_item, button_box)});

    message_container.prepend(cloned_item);
    messageCounter();
    message_id++;
}

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

function showEdit(button_box,content){
    let edit_container = content.querySelector('.edit_container');
    let edit_textarea = edit_container.querySelector('textarea');
    let message_content = content.querySelector('.message_content');
    let message = message_content.querySelector('p').innerText;
    edit_textarea.value = message;

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

function updateMessage(event, message_container, button_box){
    event.preventDefault();

    let edit_container = message_container.querySelector('.edit_container');
    let message_content = message_container.querySelector('.message_content');
    const textarea_value = edit_container.querySelector('.edit_textarea').value;
    const message_paragraph = message_content.querySelector('p');
    message_paragraph.innerText = textarea_value;

    showElement(message_content);
    showElement(button_box);
    hideElement(edit_container);
}

function messageCounter(){
    let message_count = message_container.children.length -2;
    message_counter.innerText = message_count;
    if(message_count > 0){
        hideElement(empty_message_container);
    }else{
        showElement(empty_message_container);
    }
}

function commentCounter(selected_comment){
    let comment_count = selected_comment.querySelector('.comment_container').children.length;
    let counter = selected_comment.querySelector('.comment_counter')
    let comment_button = selected_comment.querySelector('.comment');
    let comment_icon = selected_comment.querySelector('span');
    if(comment_count > 0){
        comment_icon.classList.add('has_comment');
        comment_icon.classList.remove('no_comment');  
        comment_button.classList.add('colored');
    }else{
        comment_icon.classList.add('no_comment');
        comment_icon.classList.remove('has_comment');  
        comment_button.classList.remove('colored');
    }
    counter.innerText = comment_count;
}

function showElement(element){
    element.classList.add('show');
    element.classList.remove('hide');
}

function hideElement(element){
    element.classList.add('hide');
    element.classList.remove('show');
}

function resetValue (button,textarea){
    textarea.value = '';
    button.disabled = true;
    button.classList.add('disabled');
}

function deleteSelectedItem(event){
    event.preventDefault();
    let delete_form = event.target.closest('.modal').classList;
    let clone_id = event.target[0].value;
    let selected_clone='';
    
    if(delete_form.contains('remove_message')){
        selected_clone = message_container.querySelector(`li[data-message-id="${clone_id}"]`);
        selected_clone.closest("#message_container").removeChild(selected_clone);
        hideElement(remove_message);
        messageCounter();
    }
    else{
        selected_clone = message_container.querySelector(`li[data-comment-id="${clone_id}"]`);
        console.log("came comment here");
        let comment_container = selected_clone.closest('.comment_container');
        comment_container.removeChild(selected_clone);
        hideElement(remove_comment);
        commentCounter(comment_container.closest(".message_item")); 
    }
}

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

function showHideCommentTextArea(comment_form){
    let class_list = comment_form.classList;
    let comment_container = comment_form.closest('.message_item').querySelector('.comment_container');
    if(class_list.contains('hide')){
        showElement(comment_form);
        showElement(comment_container);
    }else{
        hideElement(comment_form);
        hideElement(comment_container);
    }
}

function addComment(event){
    event.preventDefault();
    let selected_message = event.target.closest('.message_item');
    let post_comment_button = selected_message.querySelector('.post_comment_button')
    let comment_form_textarea = selected_message.querySelector('.comment_form .comment_form_textarea');
    let comment_container = selected_message.querySelector('.comment_container');

    let comment_clone = comment_item.cloneNode(true);
        comment_clone.setAttribute('data-comment-id', comment_id);
        comment_clone.querySelector('.message_content p').innerText = event.target[0].value;
    const button_box = comment_clone.querySelector('.buttons');
    const edit_container = comment_clone.querySelector('.edit_container');
    const update_button = comment_clone.querySelector('.update_button');
    button_box.querySelector('.delete').addEventListener('click', function(){showDelete(comment_clone)});
    button_box.querySelector('.edit').addEventListener('click', function(){showEdit(button_box,comment_clone)});
    edit_container.querySelector('.edit_textarea').addEventListener('keyup', (event)=>checkTextArea(event, update_button));
    edit_container.addEventListener('submit', function(event){updateMessage(event, comment_clone, button_box)});

    comment_container.prepend(comment_clone);
    resetValue(post_comment_button,comment_form_textarea);
    showElement(comment_clone);
    showElement(comment_container);
    commentCounter(selected_message);
    comment_id++;
}

