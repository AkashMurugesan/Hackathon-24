import re
import pandas as pd
import json
import matplotlib.pyplot as plt

from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers
from flask import Flask, jsonify, request 
# creating a Flask app 
app = Flask(__name__) 

## Function To get response from LLAma 2 model

def getLLamaresponse(template, input_json):

    ### LLama2 model
    llm=CTransformers(model='models/llama-2-7b-chat.ggmlv3.q8_0.bin',
                      model_type='llama',
                      config={'max_new_tokens':256,
                              'temperature':0.01})
    
    ## Prompt Template
    
    
    prompt=PromptTemplate(input_variables=["input_json"],
                          template=template)
    
    ## Generate the ressponse from the LLama 2 model
    response=llm(prompt.format(input_json=input_json))
    print(response)
    return response


data = pd.read_csv('./UCI_Heart_Disease_Dataset_Combined.csv')
df = pd.DataFrame(data)
templateOfContentType = """There are table data columns from data base: {input_json}.
    Could you provide the column name and then suggest a commonly used table name? Please offer a single name, and you will  finalize it by your own, From your response, I need just one word, not details, please."""
content = getLLamaresponse(templateOfContentType, str(df.columns))
match = re.search(r'"([^"]*)"', content)
if match:
    table_name = match.group(1)
chartTemplate = """There are table data columns from the database: {input_json} .
Can you suggest me with some possible chart using this dataset for visualization? 
Please do not include any extra details or sample inputs.
The result should be array of object in json (fields in JSON object with following keys (tilte, xColumnName , yColumnName, chartType), xcolumnName and yColumnName are name of table column) format"""

chartResponse = getLLamaresponse(chartTemplate, ', '.join(df.columns))
start_idx = chartResponse.find('[')
end_idx = chartResponse.rfind(']') + 1

# Extract the array substring
array_string = chartResponse[start_idx:end_idx]

# Load the array as JSON
array = json.loads(array_string)
for arr in array:
    print(arr)
    arr['xColumnData'] = df[arr['xColumnName']].tolist()
    arr['yColumnData'] = df[arr['yColumnName']].tolist()
    title = arr["title"]
    x_col = arr["xColumnName"]
    y_col = arr["yColumnName"]
    chart_type = arr["chartType"]

    plt.figure()
    plt.title(title)
    if chart_type == "bar":
        df.plot(kind="bar", x=x_col, y=y_col)
    elif chart_type == "line":
        df.plot(kind="line", x=x_col, y=y_col)
    plt.show()
    
