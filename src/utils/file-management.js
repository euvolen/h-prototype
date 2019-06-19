import {createWriteStream, unlink} from 'fs'

export const storeUpload = ({ stream, filename, profile }) =>
{    

    const dir = `./assets/${profile}/img/`
    if (!existsSync(dir)){
      mkdirSync(dir);
  }
    const path = dir+filename
    new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve())
      .on("error", reject)
  );}

  export const removeUpload = async ({ filename, profile }) =>
{    

    const path = `./assets/${profile}/img/${filename}`
    if (!existsSync(path)){
      return false
    }
  
     await unlink(path, err=>{
       if(err) return false
       return true
     })
  
   }