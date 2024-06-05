-- Create Table '23 Diseases by State and Month Count
DROP TABLE IF EXISTS USDiseases_2023;

CREATE TABLE USDiseases_2023 (
	State_of_Occurrence VARCHAR(100),	
	Week_Ending_Year INT,	
	Week_Ending_Month INT,	
	All_Cause INT,
	Natural_Cause INT,
	Septicemia DECIMAL,
	Malignant_neoplasms DECIMAL,
	Diabetes_mellitus DECIMAL,
	Alzheimer DECIMAL,
	Influenza_pneumonia DECIMAL,
	Chronic_lower_respiratory_diseases DECIMAL,
	Other_diseases_rsd DECIMAL,
	Nephritis_nephrotic_nephrosis DECIMAL,
	Symptoms_signs_abnormal DECIMAL,
	Diseases_heart DECIMAL,
	Cerebrovascular_diseases DECIMAL,
	COVID19_Multiple DECIMAL,
	COVID19_Underlying DECIMAL,
	PRIMARY KEY(State_of_Occurrence, Week_Ending_Year, Week_Ending_Month)
);

-- Create Table for 2023 Disease count by State
DROP TABLE IF EXISTS StateDiseases_2023;

CREATE TABLE StateDiseases_2023 (
	State_of_Occurrence VARCHAR(100),	
	All_Cause INT,
	Natural_Cause INT,
	Septicemia DECIMAL,
	Malignant_neoplasms DECIMAL,
	Diabetes_mellitus DECIMAL,
	Alzheimer DECIMAL,
	Influenza_pneumonia DECIMAL,
	Chronic_lower_respiratory_diseases DECIMAL,
	Other_diseases_rsd DECIMAL,
	Nephritis_nephrotic_nephrosis DECIMAL,
	Symptoms_signs_abnormal DECIMAL,
	Diseases_heart DECIMAL,
	Cerebrovascular_diseases DECIMAL,
	COVID19_Multiple DECIMAL,
	COVID19_Underlying DECIMAL,
	PRIMARY KEY(State_of_Occurrence)
);

SELECT * FROM StateDiseases_2023;

