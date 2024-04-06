import re
import pandas as pd
import json

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

@app.route('/dashboard', methods = ['GET']) 
def dashboard():
    data = pd.read_csv('../csv/UCI_Heart_Disease_Dataset_Combined.csv')
    df = pd.DataFrame(data)
    templateOfContentType = """There are table data columns from data base: {input_json}.
        Could you provide the column name and then suggest a commonly used table name? Please offer a single name, and you will  finalize it by your own, From your response, I need just one word, not details, please."""
    content = getLLamaresponse(templateOfContentType, str(df.columns))
    match = re.search(r'"([^"]*)"', content)
    if match:
        table_name = match.group(1)
    
    lineTemplate = """There are table data columns from the database: {input_json} .
    Can you suggest me with some possible line chart using this dataset for visualization? 
    Please do not include any extra details or sample inputs.
    The result should be array of object in json (fields in JSON object with following keys (tilte, xColumnName , yColumnName, chartType(only line charts)), xcolumnName and yColumnName are name of table column) format"""
    
    pieTemplate = """There are table data columns from the database: {input_json} .
    Can you suggest me with some possible pie chart using this dataset for visualization? 
    Please do not include any extra details or sample inputs.
    The result should be array of object in json (fields in JSON object with following keys (tilte, columnName), columnName is name of table column) format"""
    lineResponse = getLLamaresponse(lineTemplate, ', '.join(df.columns))
    pieResponse = getLLamaresponse(pieTemplate, ', '.join(df.columns))
    start_idx = lineResponse.find('[')
    end_idx = lineResponse.rfind(']') + 1

    # Extract the array substring
    array_string = lineResponse[start_idx:end_idx]

    # Load the array as JSON
    array = json.loads(array_string)
    for arr in array:
        if arr['chartType'] == "line":
            arr['plot'] = df[arr['xColumnName']].tolist()
            arr['yColumnData'] = df[arr['yColumnName']].tolist()
        elif arr['chartType'] == "pie":
            count = df[arr['columnName']].value_counts()
            arr['columnData'] = count
    return array
  
  
# driver function 
if __name__ == '__main__': 
  
    app.run(debug = True) 
    
