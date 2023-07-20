// Function to retrieve chat messages from the cookie
function getChatMessages() {
  // ... (existing code for getChatMessages function)
  return [];
}

// Function to save the chat data (user info and messages) to cookies
function saveChatData(user, messages) {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 10); // Set to expire 10 years from now

  document.cookie = `chatUser=${JSON.stringify(user)}; expires=${expirationDate.toUTCString()}; path=/;`;
  document.cookie = `chatMessages=${JSON.stringify(messages)}; expires=${expirationDate.toUTCString()}; path=/;`;
}

// JavaScript to handle the chat functionality
document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.querySelector(".chat-container");
    const messageInput = document.getElementById("message");
    const sendBtn = document.getElementById("sendBtn");

    // Function to add a new message to the chat container
    function addMessage(sender, content, color) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message");
        messageDiv.innerHTML = `
            <div class="message-sender" style="color: ${color}">${sender}</div>
            <div class="message-content">${content}</div>
        `;
        chatContainer.appendChild(messageDiv);
    }

    // Function to handle sending a message
    function sendMessage() {
        const username = document.getElementById("username").value.trim();
        const nameColor = document.getElementById("nameColor").value;
        const message = messageInput.value.trim();

        if (!username || !nameColor || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Add the message to the chat
        addMessage(username, message, nameColor);

        //Get the existing chat messages from the cookie
        const existingMessages = getChatMessages()

        // Combine the user information and new message into a single object
  const messageData = {
    sender: username,
    content: message,
    color: nameColor
  };

  // Append the new message to the existing messages
  existingMessages.push(messageData);

  // Save the user information and updated chat messages to the cookie
  saveChatData(existingMessages);

        // Clear the message input
        messageInput.value = "";
    }

    // Event listener for the send button
    sendBtn.addEventListener("click", sendMessage);

    // Event listener for Enter key in the message input
    messageInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

// Function to save the chat messages to a cookie
function saveChatMessages(messages) {
  document.cookie = `chatMessages=${JSON.stringify(messages)}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;`;
}

// Function to retrieve chat messages from the cookie
function getChatMessages() {
  const name = "chatMessages=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return JSON.parse(cookie.substring(name.length, cookie.length));
    }
  }
  return [];
}