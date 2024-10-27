import streamlit as st
import pandas as pd
import random
import os
import sys

# Get the current working directory
current_dir = os.getcwd()
# Change directory into db directory
data_dir = os.path.join(current_dir, 'data')
sys.path.append(data_dir)

import utils.utils as utils

# @st.cache_data
def load_data():
    df = pd.read_csv(os.path.join(data_dir, 'products.csv'))
    return df

def this_or_that_game(df):
    st.header("This or That Game")
    st.write("Choose your preference for each pair. Click once to select.")

    questions = [
        ("Sweet", "Sour"),
        ("Fruity", "Herbal"),
        ("Strong", "Mild")
    ]

    if 'answers' not in st.session_state:
        st.session_state.answers = {}
    if 'current_question' not in st.session_state:
        st.session_state.current_question = 0

    filtered_df = df.copy()

    for i in range(len(questions)):
        if i < st.session_state.current_question:
            q1, q2 = questions[i]
            key = f"{q1}_or_{q2}"
            filtered_df = filter_by_preference(filtered_df, key, st.session_state.answers[key])

    if st.session_state.current_question < len(questions):
        q1, q2 = questions[st.session_state.current_question]
        st.write(f"Question {st.session_state.current_question + 1} of {len(questions)}")
        
        col1, col2 = st.columns(2)

        key = f"{q1}_or_{q2}"
        current_selection = st.session_state.answers.get(key, None)

        if col1.button(q1, key=f"q1_{st.session_state.current_question}", 
                       help="Click to select" if current_selection != q1 else "Selected",
                       use_container_width=True):
            st.session_state.answers[key] = q1
            st.session_state.current_question += 1
            st.rerun()
        
        if col2.button(q2, key=f"q2_{st.session_state.current_question}", 
                       help="Click to select" if current_selection != q2 else "Selected",
                       use_container_width=True):
            st.session_state.answers[key] = q2
            st.session_state.current_question += 1
            st.rerun()

        if current_selection:
            st.markdown(f"""
            <style>
            div.stButton > button:first-child {{ background-color: #4CAF50; color: white; }}
            </style>
            """, unsafe_allow_html=True)

    else:
        st.success("You've answered all questions! Here are your preferences:")
        for key, value in st.session_state.answers.items():
            st.write(f"{key.replace('_or_', ' vs ')}: {value}")
        
        col1, col2 = st.columns(2)
        if col1.button("Submit", key="submit_button", use_container_width=True):
            return st.session_state.answers, filtered_df
        if col2.button("Start Over", key="start_over_button", use_container_width=True):
            st.session_state.answers = {}
            st.session_state.current_question = 0
            st.rerun()
    
    return None, filtered_df

def filter_by_preference(df, key, preference):
    preference_filters = {
        "Sweet_or_Sour": lambda df, pref: df[df['flavor'].str.contains('Sweet|Honey|Caramel', case=False, na=False)] if pref == "Sweet" else df[df['flavor'].str.contains('Sour|Tart|Citrus', case=False, na=False)],
        "Fruity_or_Herbal": lambda df, pref: df[df['flavor'].str.contains('Fruit|Berry|Apple|Peach', case=False, na=False)] if pref == "Fruity" else df[df['flavor'].str.contains('Herb|Spice|Botanical', case=False, na=False)],
        "Strong_or_Mild": lambda df, pref: df[df['alcohol_percentage'].astype(float) > 35] if pref == "Strong" else df[df['alcohol_percentage'].astype(float) <= 35],
    }
    
    if key in preference_filters:
        filtered_df = preference_filters[key](df, preference)
        if filtered_df.empty:
            return df  # Return original dataframe if filtered is empty
        return filtered_df
    return df

def pop_the_balloon_game(flavors):
    st.header("Pop the Balloon Game")
    st.write("Pop a balloon to select a flavor!")
    
    if "popped_flavor" not in st.session_state:
        st.session_state.popped_flavor = None
    
    cols = st.columns(5)
    flavors_shuffled = random.sample(list(flavors), min(len(flavors), 10))
    
    for idx, flavor in enumerate(flavors_shuffled):
        if cols[idx % 5].button(f"🎈 Balloon {idx+1}"):
            st.session_state.popped_flavor = flavor
    
    if st.session_state.popped_flavor:
        st.success(f"🎉 You popped a balloon and found the flavor: {st.session_state.popped_flavor}")
        col1, col2 = st.columns(2)
        if col1.button("Submit", key="submit_balloon", use_container_width=True):
            return st.session_state.popped_flavor
        if col2.button("Start Over", key="start_over_balloon", use_container_width=True):
            st.session_state.popped_flavor = None
            st.rerun()
    
    return None

def create_recommendation_block(row, is_top=False):
    border_color = "gold" if is_top else "red"
    header_text = "Our Top Pick for You" if is_top else "Another Great Option"
    
    return f"""
    <div style="border: 2px solid {border_color}; border-radius: 10px; padding: 15px; background-color: #1E1E1E; color: white; margin-bottom: 15px;">
        <h2 style="color: {border_color};">{header_text}</h2>
        <h3>{row['item_desc']}</h3>
        <p><strong>Brand:</strong> {row['corp_item_brand_name']}</p>
        <p><strong>Flavor:</strong> {row['flavor']}</p>
        <p><strong>Alcohol:</strong> {row['alcohol_percentage']:.2f}%</p>
    </div>
    """

def main():
    # Configure Streamlit page
    st.set_page_config(
        page_title="Southern Glazer's Brand Explorer",
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    utils.render_header()
    utils.render_main_image()
    st.title("🎮 Let's Play a Game!")
    
    st.markdown("""
    <div style='text-align: left;'>
        <p>Follow these simple steps to enjoy the game:</p>
        <ol>
            <li>🔍 <strong>Step 1:</strong> Select your favorite brand(s).</li>
            <li>🎲 <strong>Step 2:</strong> Choose a game to play.</li>
            <li>🎉 <strong>Step 3:</strong> Receive personalized recommendations based on your selections!</li>
        </ol>
        <p>Have fun discovering new flavors!</p>
    </div>
    """, unsafe_allow_html=True)
    
    df = load_data()
    # Convert alcohol_percentage to float
    df['alcohol_percentage'] = pd.to_numeric(df['alcohol_percentage'], errors='coerce')
    
    st.header("Step 1: Select Brand(s)")
    brand_options = df['corp_item_brand_name'].unique()
    selected_brands = st.multiselect("Select Brand(s)", options=brand_options, default=[])

    if not selected_brands:
        st.warning("Please select at least one brand to continue.")
        st.stop()

    filtered_df = df[df['corp_item_brand_name'].isin(selected_brands)]

    st.header(f"Step 2: How do you like your {', '.join(selected_brands).lower()}?")

    game_option = st.radio(
        "Select a game:",
        ("This or That Game", "Pop the Balloon")
    )

    if game_option == "This or That Game":
        preferences, filtered_df = this_or_that_game(filtered_df)
    
    elif game_option == "Pop the Balloon":
        flavors = filtered_df['flavor'].dropna().unique()
        selected_flavor = pop_the_balloon_game(flavors)
        
        if selected_flavor:
            filtered_df = filtered_df[filtered_df['flavor'] == selected_flavor]

    # Create a submit button only when all questions are answered
    if (game_option == "This or That Game" and preferences is not None) or \
       (game_option == "Pop the Balloon" and selected_flavor is not None):
        st.header("Our Recommendations")
        if not filtered_df.empty:
            recommendations = filtered_df.sample(min(4, len(filtered_df)))
            
            # Display top recommendation
            st.markdown(create_recommendation_block(recommendations.iloc[0], is_top=True), unsafe_allow_html=True)
            
            # Display other recommendations
            for _, row in recommendations.iloc[1:].iterrows():
                st.markdown(create_recommendation_block(row), unsafe_allow_html=True)
        else:
            st.warning("No recommendations available based on your selections.")
        
        col1, col2 = st.columns(2)
        if col1.button("New Game", key="new_game", use_container_width=True):
            st.session_state.clear()
            st.rerun()
        if col2.button("Start Over", key="start_over_final", use_container_width=True):
            st.session_state.clear()
            st.rerun()

if __name__ == "__main__":
    main()