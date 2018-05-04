<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints AS Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FormationRepository")
 */
class Formation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="Veuillez entrez le titre de la formation")
     */
    protected $title;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotNull(message="Veuillez entrez le contenu de la formation")
     */
    protected $content;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\NotNull(message="Veuillez entrez le sommaire de la formation")
     */
    protected $smallContent;

    /**
     * @var
     * @ORM\ManyToOne(targetEntity="App\Entity\Filiere", inversedBy="formations")
     * @Assert\NotNull(message="Faite le choix d'une filiere avant de continuer")
     */
    protected $filiere;


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

    public function setSmallContent(?string $smallContent): self
    {
        $this->smallContent = $smallContent;

        return $this;
    }

    public function getFiliere(): ?Filiere
    {
        return $this->filiere;
    }

    public function setFiliere(?Filiere $filiere): self
    {
        $this->filiere = $filiere;

        return $this;
    }
}
