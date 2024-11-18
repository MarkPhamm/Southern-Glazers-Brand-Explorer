import streamlit as st
from openai import OpenAI
import utils.utils as utils 

def get_ai_response(messages, model, client):
    chat_completion = client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=300,  # Reduced max tokens for cost efficiency
        temperature=0.7
    )
    return chat_completion.choices[0].message.content


def main():
    utils.render_header()
    utils.render_main_image()
    # Streamlit page for the chatbot interaction
    st.title("🍷 Wine ChatBot - Recipe Suggestions")
    st.markdown("""
    Welcome to the Wine ChatBot! Here, you can explore a variety of wine options, get personalized recipe suggestions, and ask questions you may have about wines and cocktails. Whether you're looking for the perfect pairing or a new cocktail recipe, I'm here to help you discover the best options!
    """)
    
    # Let the user input the OpenAI key
    openai_api_key = st.text_input("Enter your OpenAI API Key:", type="password")

    if openai_api_key:
        client = OpenAI(api_key=openai_api_key)
    else:
        st.warning("Please enter your OpenAI API Key to use the chatbot.")
        st.stop()

    # Use the more cost-effective gpt-3.5-turbo model
    model = "gpt-3.5-turbo"
    # Initialize chat history in session state if it doesn't exist
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []
    
    # Display chat history
    for message in st.session_state.chat_history:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
    
    # Get user input
    user_input = st.chat_input("What wine would you like to use, or do you have any questions?")
    
    if user_input:
        # Add user message to chat history
        st.session_state.chat_history.append({"role": "user", "content": user_input})
        
        # Display user message
        with st.chat_message("user"):
            st.markdown(user_input)
        
        # Prepare messages for AI, including chat history
        messages = [
            {"role": "system", "content": "You are a knowledgeable wine enthusiast. Provide concise wine information, brief recipe suggestions, and answer questions about wines and cocktails."},
        ] + st.session_state.chat_history
        
        # Get AI response
        ai_response = get_ai_response(messages, model, client)
        
        # Add AI response to chat history
        st.session_state.chat_history.append({"role": "assistant", "content": ai_response})
        
        # Display AI response
        with st.chat_message("assistant"):
            st.markdown(ai_response)

    # Add a button to clear chat history
    if st.button("Clear Chat History"):
        st.session_state.chat_history = []
        st.rerun()

if __name__ == "__main__":
    main()
