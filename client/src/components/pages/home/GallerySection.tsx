import { webData } from "../../../data/db";
import CardCarousel from "../../utils/CardCarousel";

// interface props {
//   labelOne?: string,
//   labelTwo?: string,
// }

function GallerySection(
  // { labelOne = "Comedy Shows", labelTwo = "Kid's Music" }: props
) {

  // const videoCarouselWidth = window.innerWidth >= 680 ? 360 : window.innerWidth >= 512 ? 300 : 300;
  // const musicCarouselWidth = 200;

  return (
    <>
      <CardCarousel
        width={300}
        title={'Story Time'}
        slides={webData.storyVideos}
        // customClass='mb-96'
      />
      <CardCarousel
        width={200}
        title={'Roast My Pic!'}
        slides={webData.roastVideos}
        landscape={false}
        // customClass='mb-96'
      />
      <CardCarousel
        width={300}
        title={'Lofi Mix'}
        slides={webData.lofiVideos}
        // customClass='mb-96'
      />
      <CardCarousel
        width={200}
        title={'Children Music'}
        slides={webData.childrenMusic}
        landscape={false}
        // customClass='mb-96'
      />
      <CardCarousel
        width={200}
        title={'Jukebox Music'}
        slides={webData.jukeboxMusic}
        landscape={false}
        // customClass='mb-96'
      />
    </>
  );
}

export default GallerySection;
