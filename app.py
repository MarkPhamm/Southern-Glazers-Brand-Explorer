import pandas as pd
import streamlit as st
import random

import model.wine_rec

import tabs.menu
# import tabs.recommendation
# import tabs.recipe

# Set the page configuration
st.set_page_config(
    page_title="Southern Glazers Brand Explorer",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Create columns for side-by-side layout
col1, col2 = st.columns([0.2, 2])

with col1:
    st.image('images/logo.png', width=100)

with col2:
    st.markdown(
        """
        <h1 style='font-size: 50px; color: red;'>Southern Glazer's Wine & Spirits Brand Explorer</h1>
        """,
        unsafe_allow_html=True
    )

st.image('images/wines.jpg', caption="A variety of wines", use_column_width=True)

st.markdown(
    """
    <h1 style='font-size: 45px; color: red; text-align: center;'>List of Recommended Alcohols</h1>
    """,
    unsafe_allow_html=True
)

# Step 1: Brand selection
st.sidebar.header("Select Pages")
page = st.sidebar.radio("Select Page", options=["Menu Search", "Further Wine recommendation", "Recipe Creator"])

df = pd.read_csv('data/products.csv', index_col=None)

if page == "Menu Search":
    tabs.menu.main()

# elif page == "Further Wine recommendation":
#     tabs.recommendation.main()

# elif page == "Recipe Creator":
#     tabs.recipe.chatbot_page()