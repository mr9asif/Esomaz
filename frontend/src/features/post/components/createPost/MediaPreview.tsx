// interface Props{

// images:File[];

// setImages:any;

// }

// export default function MediaPreview({

// images,

// setImages

// }:Props){

// if(images.length===0)return null;

// return(

// <div className="grid grid-cols-2 gap-2 mt-4">

// {

// images.map((image,index)=>(

// <div

// key={index}

// className="relative"

// >

// <img

// src={URL.createObjectURL(image)}

// className="rounded-xl"

//  />

// <button

// className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6"

// onClick={()=>{

// setImages(

// images.filter((_,i)=>i!==index)

// )

// }}

// >

// ×

// </button>

// </div>

// ))

// }

// </div>

// )

// }