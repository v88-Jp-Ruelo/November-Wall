/* variables */
const create_message_button = document.getElementById('create_message_button');
const close_modal = document.querySelectorAll('.close_modal');
const delete_button = document.querySelectorAll('.delete_button');
const post_button = document.querySelector('.post_button');
const create_message_modal = document.querySelector('.create_message_modal');
const new_message_textarea = document.querySelector('.new_message_textarea');
const message_item = document.querySelector('.message_item');
const comment_item = document.querySelector('.comment_item');
const empty_message_container = document.querySelector('.empty_message_container');
const message_counter = document.querySelector('.message_counter');
const message_container = document.getElementById('message_container');
const remove_message = document.querySelector('.remove_message');
const remove_comment = document.querySelector('.remove_comment');
var previous_message = "";
var next_previous_message = "";
/* trigger to show create message modal */
create_message_button.addEventListener('click', function(){
    showElement(create_message_modal);
});
/* hide modal when click cancel or close button */
for(let index = 0; index < close_modal.length; index++){
    close_modal[index].addEventListener('click', function(event){
        hideElement(event.target.closest("form"));
        resetValue(post_button,new_message_textarea);
    });
}
/* Event listener to check if textarea have any text */
new_message_textarea.addEventListener('keyup', function(event){
    checkTextArea(event,post_button);
});
/* trigger a new message everytime you click */
post_button.addEventListener('click', function(){
    createMessage(new_message_textarea.value);
    resetValue(post_button,new_message_textarea);
    hideElement(create_message_modal);
});
/* Event Listener whenever delete button has been click */
let selected_clone = '';
for(let index = 0; index < delete_button.length; index++){
    delete_button[index].addEventListener('click', function(event){
        let message_container = selected_clone.parentElement;
        let delete_form = event.target.closest("form").classList;
        if(event.target.classList.contains('delete_button')){
            message_container.removeChild(selected_clone);
            if(delete_form.contains('remove_message')){
                hideElement(remove_message);
                messageCounter();
            }else{
                commentCounter(message_container.parentElement);
                hideElement(remove_comment);
            }
        }
    });
}


/* functions */
function createMessage(content){
    let cloned_item = message_item.cloneNode(true);
        cloned_item.classList.remove('hide');
        cloned_item.querySelector('textarea').innerText = content;
        previous_message = content;
        next_previous_message = previous_message;
    let edit_container = cloned_item.querySelector('.edit_container');
    let update_button = cloned_item.querySelector('.update_button');
    let edit_form = cloned_item.querySelector('.edit_form');
    let comment_form = cloned_item.querySelector('.comment_form');
    let post_comment_button = comment_form.querySelector('.post_comment_button');
    const button_box = cloned_item.querySelector('.buttons');
    /* trigger to show or hide comment */
    button_box.querySelector('.comment').addEventListener('click', function(){showHideCommentTextArea(comment_form)});

    /* trigger to check if textarea comment is empty */
    comment_form.querySelector('textarea').addEventListener('keyup', function(event){checkTextArea(event,post_comment_button)});

    /* trigger to show delete modal */
    button_box.querySelector('.delete').addEventListener('click', function(){removeMessage(cloned_item)});

    /* Event Listener whenever a user click post comment button */
    cloned_item.querySelector('.comment_form').addEventListener('submit', function(event){addComment(event)});

    /* trigger to show editable textarea */
    button_box.querySelector('.edit').addEventListener('click', ()=>{showEdit(button_box,cloned_item)});

    /* trigger when user click update button */
    update_button.addEventListener('click', function(){updateContent(cloned_item)});

    /* trigger to check if textarea in edit form is empty */
    edit_form.querySelector('textarea').addEventListener('keyup', function(event){checkTextArea(event,update_button)});

    /*  trigger when user click cancel while editing, forget all new user input */
    edit_container.querySelector('.cancel_update_button').addEventListener('click', function(){cancelUpdateContent(cloned_item)});
        
    message_container.prepend(cloned_item);
    messageCounter();
}

function cancelUpdateContent(textarea_value){
    let edit_textarea_form = textarea_value.querySelector('.edit_form textarea');
    hideElement(textarea_value.querySelector('.edit_container'));
    showElement(textarea_value.querySelector('.buttons'));
    previous_message = next_previous_message;
    edit_textarea_form.value = previous_message;
    textarea_value.classList.add('not_editable');
    textarea_value.classList.remove('editable');
    edit_textarea_form.disabled = true; 
}
function updateContent(textarea_value){
    let edit_textarea_form = textarea_value.querySelector('.edit_form textarea');
    if(edit_textarea_form.value.length > 0){
        hideElement(textarea_value.querySelector('.edit_container'));
        showElement(textarea_value.querySelector('.buttons'));
        next_previous_message = edit_textarea_form.value;
        console.log(next_previous_message);
        textarea_value.classList.add('not_editable');
        textarea_value.classList.remove('editable');
        edit_textarea_form.disabled = true;
    }
}

function messageCounter(){
    let message_count = message_container.children.length - 2;
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
    if(class_list.contains('hide')){
        showElement(comment_form);
    }else{
        hideElement(comment_form);
    }
}


function removeMessage(cloned_message){
    selected_clone = cloned_message;
    showElement(remove_message);
}

function removeComment(comment_clone){
    showElement(remove_comment);
    selected_clone = comment_clone;
}

function addComment(event){
    event.preventDefault();
    let selected_message = event.target.parentElement;
    let post_comment_button = selected_message.querySelector('.post_comment_button')
    let comment_form_textarea = selected_message.querySelector('.comment_form textarea');
    let comment_container = selected_message.querySelector('.comment_container');
    let comment_clone = comment_item.cloneNode(true);
    const button_box = comment_clone.querySelector('.buttons');
    const edit_form = comment_clone.querySelector('.edit_form');
    const edit_container = comment_clone.querySelector('.edit_container');
    const update_button = comment_clone.querySelector('.update_button');

    comment_clone.querySelector('form textarea').value = comment_form_textarea.value;
    comment_clone.querySelector('.delete').addEventListener('click', function(){removeComment(comment_clone)});
    comment_clone.querySelector('.edit').addEventListener('click', function(){showEdit(button_box,comment_clone)});
    edit_container.querySelector('.update_button').addEventListener('click', ()=>updateContent(comment_clone));
    edit_container.querySelector('.cancel_update_button').addEventListener('click', ()=>cancelUpdateContent(comment_clone));
    edit_form.querySelector('textarea').addEventListener('keyup', (event)=>checkTextArea(event, update_button));

    resetValue(post_comment_button,comment_form_textarea);
    showElement(comment_clone);
    showElement(comment_container);
    comment_container.prepend(comment_clone);
    commentCounter(selected_message);
}
function showEdit(button_box,content){
    let class_item = content.classList;
    let textarea = content.querySelector('textarea');
    let edit_container = content.querySelector('.edit_container');
    if(class_item.contains('not_editable')){
        hideElement(button_box);
        showElement(edit_container);
        content.classList.add('editable');
        content.classList.remove('not_editable');
        textarea.disabled = false;
    }
}