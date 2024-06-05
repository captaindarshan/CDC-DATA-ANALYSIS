-- Query Statements
SELECT * FROM USDiseases_2023;
SELECT * FROM StateDiseases_2023;

-- Find total alzheimer cases for the state of New York
SELECT "state_of_occurrence" AS "State", "alzheimer" AS "Alzheimer Count"
FROM StateDiseases_2023
WHERE "state_of_occurrence" = 'New York';

-- Cross check with US Diseases 2023 dataset - add all cases
SELECT "state_of_occurrence" AS "State", SUM(alzheimer) AS "Alzheimer Count"
FROM USDiseases_2023
WHERE "state_of_occurrence" = 'New York'
GROUP BY "state_of_occurrence";

