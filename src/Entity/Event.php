<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints AS Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="Entrez le nom de la formation pour continuer")
     */
    protected $name;

    /**
     * @ORM\Column(type="text", name="content")
     * @Assert\NotNull(message="Entrez un contenu de description")
     */
    protected $content;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Gedmo\Slug(fields={"name", "id"}, separator="_", updatable=false)
     */
    protected $slug;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\NotNull(message="Entrez la date pour continuer")
     */
    protected $dateAt;

    /**
     * @ORM\Column(type="time", nullable=true)
     * @Assert\NotNull(message="Selectionnez l'heure pour continuer")
     */
    protected $times;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Assert\NotNull(message="Entrez le nom du lieu pour continuer")
     */
    protected $lieu;

    /**
     * @var
     * @ORM\ManyToOne(targetEntity="App\Entity\Filiere", inversedBy="events")
     * @Assert\NotNull(message="Faite le choix d'une filiere avant de continuer")
     */
    protected $filiere;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(?string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getDateAt(): ?\DateTimeInterface
    {
        return $this->dateAt;
    }

    public function setDateAt(?\DateTimeInterface $date): self
    {
        $this->dateAt = $date;

        return $this;
    }
    
    public function getLieu(): ?string
    {
        return $this->lieu;
    }

    public function setLieu(?string $lieu): self
    {
        $this->lieu = $lieu;

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

    public function getTimes(): ?\DateTimeInterface
    {
        return $this->times;
    }

    public function setTimes(?\DateTimeInterface $times): self
    {
        $this->times = $times;

        return $this;
    }
}
