import pandas as pd
import streamlit as st
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity

# Define the recommend_wines function
def recommend_wines(df, item_desc):
    features = ['alcohol_percentage', 'sweetness_level', 'bitterness_level', 'acidity_level', 'tannin_level', 'serving_temperature', 'price']
    
    df[features] = df[features].fillna(df[features].mean())
    
    scaler = StandardScaler()
    df_scaled = scaler.fit_transform(df[features])
    
    idx = df.index[df['item_desc'] == item_desc].tolist()
    
    if not idx:
        return "Item description not found."
    
    idx = idx[0]
    
    cosine_sim = cosine_similarity(df_scaled)
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    top_indices = [i[0] for i in sim_scores[1:4]]
    recommendations = df.iloc[top_indices]
    
    return recommendations[['item_desc', 'corp_item_brand_name', 'pim_item_class_desc', 'pim_item_sub_class_desc', 'flavor', 'price']]