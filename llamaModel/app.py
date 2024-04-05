from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers

## Function To get response from LLAma 2 model

def getLLamaresponse(input_json):

    ### LLama2 model
    llm=CTransformers(model='models/llama-2-7b-chat.ggmlv3.q8_0.bin',
                      model_type='llama',
                      config={'max_new_tokens':256,
                              'temperature':0.01})
    
    ## Prompt Template
    template = """Hi {input_json}"""
    
    prompt=PromptTemplate(input_variables=["input_json"],
                          template=template)
    
    ## Generate the ressponse from the LLama 2 model
    response=llm(prompt.format(input_json=input_json))
    print(response)
    return response



getLLamaresponse("{ productName: 'test', amount: 100, dateSold: '10-12-2001'}")