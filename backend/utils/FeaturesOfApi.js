class FeatureOfApi{

    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex : this.queryStr.keyword,
                $options:"i"
            }
        }:{};

        this.query=this.query.find({...keyword});
        return this;


    }
    filter(){
        const queryRep={...this.queryStr};

        const remove=["keyword","page","limit"];

        remove.forEach((keyword)=>{
            delete queryRep[keyword]
        });
        let queryStr=JSON.stringify(queryRep);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,keyword=>`$${keyword}`);

        this.query=this.query.find(JSON.parse(queryStr));
        return this;



    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }

}


module.exports=FeatureOfApi;