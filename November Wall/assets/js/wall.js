/* variables */
const create_message_button = document.getElementById('create_message_button');

const close_modal_button = document.querySelectorAll('.close_modal_button');
const cancel_button = document.querySelectorAll('.cancel_button');
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


/* trigger to show create message modal */
create_message_button.addEventListener('click', function(event){
    showElement(create_message_modal);
});
/* hide modal when click cancel button */
for(let index = 0; index < cancel_button.length; index++){
    cancel_button[index].addEventListener('click', function(event){
        hideElement(event.target.parentElement.parentElement.parentElement);
        resetValue(post_button,new_message_textarea);
    });
}
/* hide modal when click close icon */
for(let index = 0; index < close_modal_button.length; index++){
    close_modal_button[index].addEventListener('click', function(event){
        hideElement(event.target.parentElement.parentElement);
        resetValue(post_button,new_message_textarea);
    });
}
/* textarea condition to post message */
new_message_textarea.addEventListener('keyup', function(event){
    let textarea_length = event.target.value.length;
    let element = event.target.nextElementSibling.children[1];
    if(textarea_length>=5){
        element.disabled = false;
        element.classList.remove('disabled');
    }
    else{
        element.classList.add('disabled');
        element.disabled = true;
    }
});
/* trigger a new message everytime you click */
post_button.addEventListener('click', function(event){
    let parent_element = event.target.parentElement.parentElement.parentElement;
    createMessage(new_message_textarea.value);
    resetValue(post_button,new_message_textarea);
    hideElement(parent_element);
});


function createMessage(content){
    let cloned_item = message_item.cloneNode(true);
        cloned_item.classList.remove('hide');
        cloned_item.querySelector('textarea').innerText = content;
    let comment_form = cloned_item.querySelector('.comment_form');
    let post_comment_button = comment_form.querySelector('.post_comment_button');
    let edit_container = cloned_item.querySelector('.edit_container');
    let update_button = cloned_item.querySelector('.update_button');
    let edit_form = cloned_item.querySelector('.edit_form');

        /* trigger to add comment */
        cloned_item.querySelector('.buttons .comment').addEventListener('click', ()=>{
            let classform = comment_form.classList;
            if(classform.contains('hide')){
                showElement(comment_form);
            }else{
                hideElement(comment_form);
            }
        });

        /* trigger to show delete modal */
        cloned_item.querySelector('.buttons .delete').addEventListener('click', ()=>{
            showElement(remove_message);
            selected_clone = cloned_item;
            
        });

        /* trigger to show edit feature */
        cloned_item.querySelector('.buttons .edit').addEventListener('click', ()=>{
            const class_item = cloned_item.classList;
            const textarea = cloned_item.querySelector('textarea');
            const edit_container = cloned_item.querySelector('.edit_container');
        
            if(class_item.contains('inactive')){
                showElement(edit_container);
                changeToActive(clone);
                textarea.disabled = false;
            }
        });
        /* add comment inside message  */
        cloned_item.querySelector('.comment_form').addEventListener('submit', (event)=>{
            event.preventDefault();
            let parentElement = event.target.parentElement;
            let post_comment_button = parentElement.querySelector('.comment_form .post_comment_button')
            let comment_form_textarea = parentElement.querySelector('.comment_form textarea');
            let comment_container = parentElement.querySelector('.comment_container');
            let comment_clone = comment_item.cloneNode(true);
            let comment_value = event.target[0].value;

            comment_clone.querySelector('form textarea').value = comment_value;
            comment_clone.querySelector('.buttons .delete').addEventListener('click', ()=>{
                showElement(remove_comment);
                selected_clone = comment_clone;
            });
            resetValue(post_comment_button,comment_form_textarea);
            showElement(comment_clone);
            showElement(comment_container);
            comment_container.prepend(comment_clone);
            commentCounter(parentElement);
        });
        /* trigger to check if textarea comment is empty */
        comment_form.querySelector('textarea').addEventListener('keyup', (event)=>{
            let textarea_length = event.target.value.length;
            if(textarea_length>=5){
                post_comment_button.disabled = false;
                post_comment_button.classList.remove('disabled');
            }
            else{
                post_comment_button.classList.add('disabled');
                post_comment_button.disabled = true;
            }
        });
        update_button.addEventListener('click', ()=>{
            let textarea = cloned_item.querySelector('.edit_form textarea');
            if(textarea.value.length > 0){
                cloned_item.classList.add('inactive');
                cloned_item.classList.remove('active');
                textarea.disabled = true;
                hideElement(cloned_item.querySelector('.edit_container'));
                showElement(cloned_item.querySelector('.buttons'));
            }
        });
        edit_container.querySelector('.cancel_update_button').addEventListener('click', ()=>{
            let textarea = cloned_item.querySelector('.edit_form textarea');
            if(textarea.value.length > 0){
                cloned_item.classList.add('inactive');
                cloned_item.classList.remove('active');
                textarea.disabled = true;
                hideElement(cloned_item.querySelector('.edit_container'));
                showElement(cloned_item.querySelector('.buttons'));
            }
        });
        edit_form.querySelector('textarea').addEventListener('keyup', (event)=>{
            let textarea_length = event.target.value.length;
            if(textarea_length>=5){
                update_button.disabled = false;
                update_button.classList.remove('disabled');
            }
            else{
                update_button.classList.add('disabled');
                update_button.disabled = true;
            }
        });

    message_container.prepend(cloned_item);
    messageCounter();
}
let selected_clone = '';

for(let index = 0; index < delete_button.length; index++){
    delete_button[index].addEventListener('click', function(event){
        let parentElement = selected_clone.parentElement;
        let parent = event.target.parentElement.parentElement.parentElement.classList;
        if(event.target.classList.contains('delete_button')){
            parentElement.removeChild(selected_clone);
            if(parent.contains('remove_message')){
                hideElement(remove_message);
                messageCounter();
            }else{
                commentCounter(parentElement.parentElement);
                hideElement(remove_comment);
            }
        }
    });
}

/* functions */
function messageCounter(){
    let message_count = message_container.children.length - 2;
    message_counter.innerText = message_count;
    if(message_count > 0){
        hideElement(empty_message_container);
    }else{
        showElement(empty_message_container);
    }
}

function commentCounter(parentElement){
    let comment_count = parentElement.querySelector('.comment_container').children.length;
    let counter = parentElement.querySelector('.comment .comment_counter')
    let comment_button = parentElement.querySelector('.comment');
    let comment_icon = parentElement.querySelector('.comment span');
    if(comment_count > 0){
        comment_icon.classList.add('active_comment_icon');
        comment_button.classList.add('active');  
    }else{
        comment_icon.classList.remove('active_comment_icon');
        comment_button.classList.remove('active'); 
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