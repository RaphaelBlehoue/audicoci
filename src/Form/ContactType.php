<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Url;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class,[
                'label' => false,
                'required' => true,
                'attr' => ['placeholder' => 'Votre nom'],
                'constraints' => [
                    new NotBlank(['message' => 'Il manque votre nom'])
                ]
            ])
            ->add('subject', TextType::class,[
                'label' => false,
                'required' => true,
                'attr' => ['placeholder' => 'Entrez le sujet ici'],
                'constraints' => [
                    new NotBlank(['message' => 'Il manque le sujet'])
                ]
            ])
            ->add('email', EmailType::class,[
                'label' => false,
                'required' => true,
                'attr' => ['placeholder' => 'Adresse Email'],
                'constraints' => [
                    new Email(['message' => 'L\'email n\'est pas valide'])
                ]
            ])
            ->add('website', TextType::class,[
                'label' => false,
                'required' => true,
                'attr' => ['placeholder' => 'http://www.exemple.com'],
                'constraints' => [
                    new NotBlank(['message' => 'Il manque votre site internet']),
                    new Url(['message' => 'le format du site web est non valide'])
                ]
            ])
            ->add('content', TextareaType::class,[
                'label' => false,
                'required' => true,
                'attr' => ['placeholder' => 'Votre Message ici'],
                'constraints' => [
                    new NotBlank(['message' => 'Le message est vide'])
                ]
            ])
            ->add('save', SubmitType::class, [
                'label' => 'Envoyer le message',
                'attr'  => ['class' => "flat-button-form border-radius-2"]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
