function fetchData(){
    const promisetoken=new Promise((resolve,reject)=>{
        console.log('test');
        setTimeout(() => 
            {if(true){
            resolve();
                    }

        else{
            reject();
        }

    },2000)});
    return promisetoken;
}

const promisetoken=fetchData();
promisetoken.then(()=>{
    console.log( "Data fetched successfully!");

}).catch(()=>{
    console.log( "Error: Failed to fetch data.");});



