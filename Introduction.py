import streamlit as st
import utils.utils as utils

# Constants
PAGE_TITLE = "Southern Glazer's Brand Explorer"
LOGO_PATH = 'images/logo.png'
MAIN_IMAGE_PATH = 'images/wines.jpg'
DATA_PATH = 'data/products.csv'


def main():
    # Configure Streamlit page
    st.set_page_config(
        page_title=PAGE_TITLE,
        layout="wide",
        initial_sidebar_state="expanded"
    )

    utils.render_header()
    utils.render_main_image()

    st.markdown("""
    # 🌟 Brand Explorer: Interactive Cocktail Creator

    Welcome to the **SGWS Brand Explorer**! 🎉 Dive into an engaging experience that allows you to explore your favorite brands and discover new ways to enjoy their products.

    ## 🎯 Project Overview
    SGWS aims to enhance consumer engagement with our supplier brands. Our products are part of everyone’s celebrations, and we're here to make it easier and more fun for you to explore and learn.

    ## 🍹 How It Works
    1. **Select Your Brand**: Choose a product from a brand family (e.g., **Crown Royal Blackberry**).
    2. **Customize Your Experience**: Play games to explore flavors, themes, and occasions.
    3. **Get Cocktail Recipes**: Receive a set of cocktail recipes along with easy-to-follow instructions.
    4. **Interact and Share**: Rate your cocktails, share them with friends, and save your favorites for later!

    ## 🎉 Main Objectives
    - **Engage** with suppliers’ brands and their products
    - **Increase** awareness and trial of different flavors and cocktails
    - **Provide** a fun and interactive experience that encourages creativity and socialization

    ## 👤 Use Case
    *Meet John: A Crown Royal enthusiast who discovers a new product, **Crown Royal Blackberry**. John visits [southernglazers.com/innovation](https://southernglazers.com/innovation) and finds the "How do you like your Crown Royal?" game. Through this interactive selection, he chooses his favorite Crown Royal products, preferred flavors, and drink styles, leading to personalized cocktail recipes!*

    ### Join Us in Exploring the World of Cocktails! 🍸
    """)


if __name__ == "__main__":
    main()