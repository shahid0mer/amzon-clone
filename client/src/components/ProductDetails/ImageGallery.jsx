
function ImageGallery({ images = [] , selectedImage, setSelectedImage }) {

  

  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col gap-2">
          {images.map((img, idx) => (
            <div 
              key={img._id || idx}
              onClick={() => setSelectedImage(idx)}
              className={`border-2 cursor-pointer ${selectedImage === idx ? 'border-orange-500' : 'border-gray-300'} w-[100px] h-[100px] object-contain`}
            >
              <img src={img.url} alt={img.alt || "product"} className="w-full h-12 object-cover " />
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-4">
        <div className="sticky top-4">
          <img 
            src={images[selectedImage]?.url} 
            alt={images[selectedImage]?.alt || "Product"} 
            className="w-full  "
          />
        </div>
      </div>
    </>
  );
}

export default ImageGallery