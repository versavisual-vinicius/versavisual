import * as React from "react"
import {
  Gallery as SharedGallery,
  GalleryGrid,
  GalleryImage,
} from "./ui/shared-element-gallery"
import { img } from "../lib/images"

type Props = {
  photos: readonly string[]
  label: string
  featured?: boolean
}

export default function Gallery({ photos, label, featured = false }: Props) {
  const galleryId = React.useId()

  return (
    <SharedGallery>
      <GalleryGrid featured={featured}>
        {photos.map((photo, index) => (
          <GalleryImage
            key={photo}
            id={`${galleryId}-${label}-${photo}`}
            src={img(photo, 1600)}
            alt={`${label} — imagem ${index + 1}`}
            loading={featured && index < 3 ? "eager" : "lazy"}
            fetchPriority={featured && index === 0 ? "high" : "auto"}
            featured={featured}
            index={index}
          />
        ))}
      </GalleryGrid>
    </SharedGallery>
  )
}
