import {
  Gallery as SharedGallery,
  GalleryGrid,
  GalleryImage,
} from "./ui/shared-element-gallery"
import { img } from "../lib/images"

type Props = {
  photos: readonly string[]
  label: string
}

export default function Gallery({ photos, label }: Props) {
  return (
    <SharedGallery>
      <GalleryGrid className="sm:columns-2 md:columns-3 lg:columns-3">
        {photos.map((photo, index) => (
          <GalleryImage
            key={photo}
            id={`${label}-${photo}`}
            src={img(photo, 1600)}
            alt={`${label} — imagem ${index + 1}`}
          />
        ))}
      </GalleryGrid>
    </SharedGallery>
  )
}
