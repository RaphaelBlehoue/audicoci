<?php

namespace App\Form;

use App\Entity\Event;
use App\Entity\Filiere;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('filiere', EntityType::class, [
                'class' => Filiere::class,
                'choice_label' => 'name',
                'label' => 'Choix de la filiere',
                'required' => true,
                'attr' => ['placeholder' => 'Choix de la filiere', 'class' => 'col-md-6']
            ])
            ->add('name', TextType::class, [
                'label' => 'Titre de la formation',
                'attr' => ['placeholder' => 'Entrez le Titre de la formation']
            ])
            ->add('dateAt', DateType::class, array(
                'label' => 'Choix de la date',
                'widget' => 'single_text',
                'html5' => false,
                'attr' => [
                    'class' => 'col-md-4',
                    "data-provide" =>"datepicker",
                    "data-date-format" => "yyyy-mm-dd"
                ]
            ))
            ->add('times', TimeType::class, [
                'label' => 'Heure de la formation',
                'widget' => 'single_text',
                'html5' => false,
                'attr' => [
                    'class' => 'col-md-4',
                    "data-provide" =>"clockpicker",
                    "data-autoclose" => true
                ]
            ])
            ->add('lieu', TextType::class, [
                'label' => 'Lieu de l\'event',
                'attr' => ['placeholder' => 'Lieu de la formation']
            ])
            ->add('content', TextareaType::class, [
                'label' => 'Contenu  de l\'actualité',
                'attr'  => ['placeholder' => 'Entrez le contenu ici', 'class' => 'ckeditor']
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Event::class,
        ]);
    }
}
