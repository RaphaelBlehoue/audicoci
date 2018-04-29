<?php

namespace App\Form;

use App\Entity\Users;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UsersEditType extends AbstractType
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
            ->add('roles', ChoiceType::class, [
                'label' => 'Choix du niveau d\'accès du users',
                'multiple' => true,
                'expanded' => true,
                'choices' => [
                    'Roles' => [
                        'Editeur' => 'ROLE_MEMBER',
                        'Administrateur' => 'ROLE_ADMIN'
                    ]
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Users::class,
            'validation_groups' => ['edit']
        ]);
    }
}
