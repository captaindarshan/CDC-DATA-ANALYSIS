# Import libraries
import numpy as np
import pandas as pd

# Read csv file
file = "./Weekly_Provisional_Counts_of_Deaths_by_State_and_Select_Causes__2020-2023_20240528.csv"

diseases_df = pd.read_csv(file)

diseases_df.head()

# information on df
diseases_df.columns
diseases_df.describe()

# clean data
# Drop columns not required and/or with nan values
# Finding nan valued columns
diseases_df.columns[diseases_df.isna().any()].tolist()

# Replace nan values with 0
diseases_df.fillna(0, inplace=True)

# check
# Finding nan valued columns - should be empty
diseases_df.columns[diseases_df.isna().any()].tolist()

# Drop columns not required and/or filled with nan values
diseases_df.drop(columns = ['Data As Of', 
                            'MMWR Year', 'MMWR Week',
                            'flag_allcause', 'flag_natcause', 'flag_sept', 
                            'flag_neopl', 'flag_diab', 'flag_alz', 'flag_inflpn', 
                            'flag_clrd', 'flag_otherresp', 'flag_nephr', 
                            'flag_otherunk', 'flag_hd', 'flag_stroke', 
                            'flag_cov19mcod', 'flag_cov19ucod'], 
                 inplace=True)

# check
diseases_df.columns
diseases_df.head()

# Filter data to only keep 2023
# Create date format column and find year only
diseases_df['Week Ending Date'] = pd.to_datetime(diseases_df['Week Ending Date'])
# diseases_df['Week Ending Date'].dt.year


# Keep only year 2023
diseases2023_df = diseases_df[diseases_df['Week Ending Date'].dt.year == 2023]
diseases2023_df.head()

# information on new df
diseases2023_df.columns
diseases2023_df.dtypes
diseases2023_df.describe()

# Group by state


disease_count = diseases2023_df.groupby(['Jurisdiction of Occurrence', 
                              diseases2023_df['Week Ending Date'].dt.year, 
                              diseases2023_df['Week Ending Date'].dt.month]).sum(numeric_only=True)
disease_count

# load dataframes into csv
# Full cleaned disease dataframe
diseases_df.to_csv("2020_to_2023_Count_of_Death_by_State_and_Cause_cleaned.csv")

# 2023 Disease data
diseases2023_df.to_csv("2023_Count_of_Death_by_State_and_Cause.csv")

# Disease Count by state and month dataframe
disease_count.to_csv("2023_Count_of_Death_by_State_and_Month.csv")

# connect and save to SQL server