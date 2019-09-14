import axios from "axios";
import Config from './config';
import RNFetchBlob from "react-native-fetch-blob";


const headers = {
    "Ocp-Apim-Subscription-Key": Config.Api_Key,
    "Content-Type": "application/json"
}
const backend_headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}


export function put(path, params) {
    const Url = Config.end_point + path;   
    console.log(Url,JSON.stringify(params)) 
    axios({
        method: 'put',
        url: Url,
        headers: headers,
        data: JSON.stringify(params)
    }).then(res =>{
        alert(res);
    }).catch(err=>{
        // alert("Success")
    })
}
export async function  createPerson(personGroupId, name, image){
   
    const Url = Config.end_point + 'persongroups/'+personGroupId+'/persons'; 
    
    const params = {
        "name": name,
        "userData": "User-provided data attached to the person."
    }    
    const res =  await axios({
        method: 'post',
        url: Url,
        headers: headers,
        data: JSON.stringify(params)
    });

    const personId = res.data.personId;
    const faceUrl = Config.end_point + 'persongroups/' + personGroupId + '/persons/' + personId + '/persistedFaces'
    if (image){
        const method = "POST";
        const response = await RNFetchBlob.fetch(
            method,
            faceUrl,
            {
                "Ocp-Apim-Subscription-Key": Config.Api_Key,
                "Content-Type": "application/octet-stream"
            },
            RNFetchBlob.wrap(image)
        );
        console.log("====================",response.data)
    }    
    const ress = await axios({
        method:'post',
        url: Config.end_point+ 'persongroups/'+personGroupId+'/train',
        headers:{"Ocp-Apim-Subscription-Key":Config.Api_Key}
    })
    console.log(faceUrl)
    return await res;     
    
}
export async function  detect(image){
    const faceUrl = Config.end_point + '/detect?returnFaceId=true&recognitionModel=recognition_02'    
    const method = "POST";
    const response = await RNFetchBlob.fetch(
        method,
        faceUrl,
        {
            "Ocp-Apim-Subscription-Key": Config.Api_Key,
            "Content-Type": "application/octet-stream"
        },
        RNFetchBlob.wrap(image)
    );
    console.log("===========detect=========",response.data)
       
    console.log(faceUrl)
    return await JSON.parse(response.data);    
}
export async function identify(personGroupId, faceIds) {
    if(faceIds.length>0){
        const faceUrl = Config.end_point + 'identify'
        const params = {            
            PersonGroupId: personGroupId,
            faceIds: faceIds            
        };
        console.log(faceUrl,params)
        const res =  await axios({
            method: 'post',
            url: faceUrl,
            headers: headers,
            data: JSON.stringify(params)
        }); 
        console.log(res.data) 
    return await res.data;     
    } else {
        return false;
    }

         

}
export async function register(email, name, password, finger, face){
    
    const backUrl = Config.backend_end_point + '/api/register';
    const params = {
        "name"                  : name,
        "email"                 : email,
        "fingerprint_data"      : finger,
        "face_id_data"          : face,
        "password"              : password,
        "password_confirmation" : password,
    }
    console.log(backUrl)
    console.log(JSON.stringify(params))
    console.log(JSON.stringify(backend_headers))
    const res =  await axios({
        method: 'post',
        url: backUrl,
        headers: backend_headers,
        data: JSON.stringify(params)
    });

    console.log("++++++++register++++++++",res.data)
    return await res.data;
} 

export async function checkFinger(fingerdata){
    const backUrl = Config.backend_end_point + '/api/checkfinger';
    const params = {
        "finger_data" : fingerdata        
    }
    const res =  await axios({
        method: 'post',
        url: backUrl,
        headers: backend_headers,
        data: JSON.stringify(params)
    });
    console.log('--------check finger---------', res.data.data)
    return await res.data.data
}

export async function checkFace(facedata){
    const backUrl = Config.backend_end_point + '/api/checkface';
    const params = {
        "face_data" : facedata        
    }
    const res =  await axios({
        method: 'post',
        url: backUrl,
        headers: backend_headers,
        data: JSON.stringify(params)
    });
    console.log('--------check finger---------', res.data.data)
    return await res.data.data
}