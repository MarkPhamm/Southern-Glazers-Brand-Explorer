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
# import config as cfg

@st.cache_data
def load_data():
    df = pd.read_csv(os.path.join(data_dir, 'products.csv'))
    return df

def this_or_that_game():
    st.header("This or That Game")
    st.write("Choose your preference for each pair. Click once to select.")

    questions = [
        ("Sweet", "Sour"),
        ("Fruity", "Herbal"),
        ("Strong", "Mild"),
        ("Creamy", "Crisp"),
        ("Classic", "Innovative")
    ]

    # Initialize answers in session state if not already present
    if 'answers' not in st.session_state:
        st.session_state.answers = {}

    for i, (q1, q2) in enumerate(questions):
        st.write(f"Question {i + 1} of {len(questions)}")
        
        col1, col2 = st.columns(2)

        key = f"{q1}_or_{q2}"
        current_selection = st.session_state.answers.get(key, None)

        # Change button text based on selection state, without disabling it
        if col1.button(f"✅ {q1}" if current_selection == q1 else q1, key=f"q1_{i}"):
            st.session_state.answers[key] = q1
        
        if col2.button(f"✅ {q2}" if current_selection == q2 else q2, key=f"q2_{i}"):
            st.session_state.answers[key] = q2

        st.write("---")  # Add a separator between questions

    # Confirm that all questions are answered
    if len(st.session_state.answers) == len(questions):
        st.success("You've answered all questions! Feel free to change any answers.")
    
    return st.session_state.answers



def filter_by_preferences(df, preferences):
    filtered_df = df.copy()
    
    preference_filters = {
        "Sweet_or_Sour": lambda df, pref: df[df['sweetness_level'] > 5] if pref == "Sweet" else df[df['acidity_level'] > 5],
        "Fruity_or_Herbal": lambda df, pref: df[df['aroma'].str.contains(pref, case=False, na=False)],
        "Strong_or_Mild": lambda df, pref: df[df['alcohol_percentage'] > 15] if pref == "Strong" else df[df['alcohol_percentage'] <= 15],
        "Creamy_or_Crisp": lambda df, pref: df[df['body'] == 'Full'] if pref == "Creamy" else df[df['body'].isin(['Light', 'Medium'])],
    }
    
    for key, value in preferences.items():
        if key in preference_filters:
            filtered_df = preference_filters[key](filtered_df, value)
    
    return filtered_df

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
        return st.session_state.popped_flavor
    
    return None

def create_blocks(filtered_df, num_columns=3, block_height=500, margin_bottom=15):
    total_rows = len(filtered_df)
    num_rows = (total_rows + num_columns - 1) // num_columns

    for i in range(num_rows):
        cols = st.columns(num_columns)
        for j, col in enumerate(cols):
            idx = i * num_columns + j
            if idx < total_rows:
                row = filtered_df.iloc[idx]
                with col:
                    st.markdown(f"""
                    <div style="border: 2px solid red; border-radius: 10px; padding: 15px; background-color: black; color: white; box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; justify-content: space-between; height: {block_height}px; width: 100%; margin-bottom: {margin_bottom}px;">
                        <h3 style="margin-top: 0; color: red; text-align: center; font-size: 24px;">{row['item_desc']}</h3>
                        <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                            <p><strong>Brand Name:</strong> {row['corp_item_brand_name']}</p>
                            <p><strong>Flavor:</strong> {row['flavor']}</p>
                            <p><strong>Sweetness Level:</strong> {row['sweetness_level']}</p>
                            <p><strong>Alcohol Percentage:</strong> {row['alcohol_percentage']}</p>
                            <p><strong>Body:</strong> {row['body']}</p>
                            <p><strong>Aroma:</strong> {row['aroma']}</p>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)

def main():
    st.title("Flavor Selection App")
    
    df = load_data()
    
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
        preferences = this_or_that_game()
        
        if preferences:
            filtered_df = filter_by_preferences(filtered_df, preferences)
            st.header("Here are your customized recommendations")
            create_blocks(filtered_df)
    
    elif game_option == "Pop the Balloon":
        flavors = filtered_df['flavor'].dropna().unique()
        selected_flavor = pop_the_balloon_game(flavors)
        
        if selected_flavor:
            final_df = filtered_df[filtered_df['flavor'] == selected_flavor]
            st.header("Here are your customized recommendations")
            create_blocks(final_df)

if __name__ == "__main__":
    main()