#   workflows

What is a workflow by definition?

“A workflow consists of an orchestrated and repeatable pattern of business activity enabled by the systematic organization of resources into processes that transform materials, provide services, or process information It can be depicted as a sequence of operations, declared as work of a person or group, an organization of staff, or one or more simple or complex mechanisms.”

Workflows REST API shall be 100% async given that they run separatedly of the core application. The Workflow REST API supports Cross Origin Resource Sharing. CORS is a way to protect authentication within a browser, against an API, system or data source that doesn't exist in the same domain that the browser's context runs. For example, you may build a web app that runs locally and needs to hit the Workflow API that would be publicly exposed by a Cloud.

There some cases that you have repetitive process or worklows in your application. Workflows cannot be confused with helpers or utilities given that pretty much worksflows are intented to be re-usable. A good example is a microservice; there is a business rule that when creating an account in your prod enviroment after completion should fire another event to create the same account in a third party prod enviroment microservice. But also there another business rule that when creating a sales tracsaction in the prod environment would fire another event to create the same trasaction in the same microservice etc enviroment.  
    
The workflow always would act as a publisher and not as an consumer. Using a workflow in your application would keep isolated your thid parties enviroments from your main codebase. 

