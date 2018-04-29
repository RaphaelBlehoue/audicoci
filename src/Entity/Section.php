<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Constraints AS Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SectionRepository")
 * @UniqueEntity(fields={"title"},message="Cet nom de section de service existe déjà")
 * @Vich\Uploadable
 */
class Section
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="Entrez le titre du service")
     */
    protected $title;

    /**
     * @Assert\File(
     *     maxSize="3M",
     *     mimeTypes={"image/png", "image/jpeg", "image/jpg"}
     * )
     * @Assert\NotNull(message="Uploadez une images illustratif")
     *
     * @Vich\UploadableField(mapping="section_image", fileNameProperty="imageName", size="imageSize")
     *
     * @var File $imageFile
     */
    protected $imageFile;


    /**
     * @ORM\Column(type="integer")
     *
     * @var integer
     */
    protected $imageSize;


    /**
     * @var string $imageName
     *
     * @ORM\Column(type="string", length=255)
     */
    protected $imageName;

    /**
     * @ORM\Column(type="text", name="content")
     * @Assert\NotNull(message="Entrez le contenu descriptif")
     */
    protected $content;

    /**
     * @ORM\Column(type="string", length=255)
     * @Gedmo\Slug(fields={"title", "id"}, separator="_", updatable=false)
     */
    protected $slug;

    /**
     * @ORM\Column(type="text", name="smallContent")
     * @Assert\NotNull(message="Entrez le sommaires")
     */
    protected $smallContent;

    /**
     * @var
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $created;

    /**
     * @var
     * @ORM\ManyToOne(targetEntity="App\Entity\Category", inversedBy="sections")
     * @Assert\NotNull(message="Faite le choix d'un service parent avant de continuer")
     */
    protected $category;

    /**
     * Section constructor.
     */
    public function __construct()
    {
        $this->created = new \DateTime('now');
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }
    

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the  update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile $image
     * @throws \Exception
     */
    public function setImageFile(?File $image = null): void
    {
        $this->imageFile = $image;
        if (null !== $image) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->created = new \DateTimeImmutable();
        }
    }
    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageSize(?int $imageSize): void
    {
        $this->imageSize = $imageSize;
    }

    public function getImageSize(): ?int
    {
        return $this->imageSize;
    }

    public function getUploadDir()
    {
        // On retourne le chemin relatif vers l'image pour un navigateur
        return 'images/section';
    }

    protected function getUploadRootDir()
    {
        // On retourne le chemin relatif vers l'image pour notre code PHP
        return __DIR__.'/../../../../public/'.$this->getUploadDir();
    }

    /**
     * @return string
     */
    public function getAssertPath()
    {
        return $this->getUploadDir().'/'.$this->imageName;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSmallContent(): ?string
    {
        return $this->smallContent;
    }

    public function setSmallContent(string $smallContent): self
    {
        $this->smallContent = $smallContent;

        return $this;
    }
}
