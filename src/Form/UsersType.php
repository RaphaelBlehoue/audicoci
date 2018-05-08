<?php

namespace App\Form;

use App\Entity\Users;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UsersType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstname', TextType::class, [
                'label' => 'Nom de l\'utilisateurs',
                'attr' => ['placeholder' => 'Entrez le Nom de l\'utilisateurs']
            ])
            ->add('lastname', TextType::class, [
                'label' => 'Prénom de l\'utilisateurs',
                'attr' => ['placeholder' => 'Entrez le Prénom de l\'utilisateurs']
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email de l\'utilisateurs',
                'attr' => ['placeholder' => 'Entrez le Email de l\'utilisateurs']
            ])
            ->add('plainPassword', RepeatedType::class, array(
                'type' => PasswordType::class,
                'first_options'  => array('label' => 'Mot de passe'),
                'second_options' => array('label' => 'Verifier le mot de passe'),
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Users::class,
        ]);
    }
}
