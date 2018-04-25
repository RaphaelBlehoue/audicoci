<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="media")
 * @ORM\Entity(repositoryClass="App\Repository\MediaRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Media
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean")
     */
    protected $status;
    /**
     * @var bool
     *
     * @ORM\Column(name="actived", type="boolean")
     */
    protected $actived;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $url;

    /**
     * @var
     * @ORM\ManyToOne(targetEntity="App\Entity\Post", inversedBy="medias")
     */
    protected $post;


    public function __construct()
    {
        $this->actived = false;
        $this->status = true;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getUploadDir()
    {
        // On retourne le chemin relatif vers l'image pour un navigateur
        return 'uploads/photos';
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
        return $this->getUploadDir().'/'.$this->url;
    }

    /**
     * @ORM\PostRemove()
     */
    public function deleteMedia()
    {
        // En PostRemove, on n'a pas accès à l'id, on utilise notre nom sauvegardé
        if (file_exists($this->getAssertPath())) {
            // On supprimes le fichier
            unlink($this->getAssertPath());
        }
    }
}
