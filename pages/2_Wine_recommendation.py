import pandas as pd
import streamlit as st
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity

import os
import sys

# Get the current working directory
current_dir = os.getcwd()
# Change directory into db directory
data_dir = os.path.join(current_dir, 'data')
import utils.utils as utils



@st.cache_data
def load_data():
    df = pd.read_csv(os.path.join(data_dir, 'products.csv'))
    return df

# Define the recommend_wines function
def recommend_wines(df, item_desc):
    features = ['alcohol_percentage', 'sweetness_level', 'bitterness_level', 'acidity_level', 'tannin_level', 'serving_temperature', 'price']
    
    # Fill missing values with column mean
    df[features] = df[features].fillna(df[features].mean())
    
    # Standardize the feature columns
    scaler = StandardScaler()
    df_scaled = scaler.fit_transform(df[features])
    
    # Find the index of the input wine
    idx = df.index[df['item_desc'] == item_desc].tolist()
    
    if not idx:
        return "Item description not found."
    
    idx = idx[0]
    
    # Calculate cosine similarity
    cosine_sim = cosine_similarity(df_scaled)
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get top 3 most similar wines (excluding the input wine itself)
    top_indices = [i[0] for i in sim_scores[1:4]]
    recommendations = df.iloc[top_indices]
    
    return recommendations[['item_desc', 'corp_item_brand_name', 'pim_item_class_desc', 'pim_item_sub_class_desc', 'flavor', 'price']]

def create_blocks(filtered_df, num_columns=3, block_height=250, margin_bottom=15):
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
                            <p><strong>Class:</strong> {row['pim_item_class_desc']}</p>
                            <p><strong>Sub-Class:</strong> {row['pim_item_sub_class_desc']}</p>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)

# Streamlit app
def display_recommendation(df):
    st.title("Wine Recommendation System")

    st.markdown("""
    ### 🍷 Wine Recommendation

    **Enter the name of your favorite wine below** to get personalized recommendations! ✨

    ### 🔍 Find Your Next Favorite:
    - Simply type the wine name and hit enter!
    - Explore new options tailored just for you.

    Start your wine journey now! 🍇
    """)

    st.markdown("# Enter a wine name:")
    # User input for wine name
    wine_name = st.text_input("Enter a wine name:", "")
    
    if wine_name:
        # Display recommendations
        recommendations = recommend_wines(df, wine_name)
        
        if isinstance(recommendations, str):
            st.write(recommendations)
        else:
            st.write("Top wine recommendations:")
            create_blocks(recommendations )

def main():
    utils.render_header()
    utils.render_main_image()
    df = load_data()
    display_recommendation(df)


if __name__ == "__main__":
    main()