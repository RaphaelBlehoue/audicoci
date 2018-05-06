<?php

namespace App\Form;

use App\Entity\Partner;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Vich\UploaderBundle\Form\Type\VichImageType;

class PartnerType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Renseignez le nom du partenaires',
                'attr' => ['placeholder' => 'Nom du partenaires']
            ])
            ->add('website', TextType::class, [
                'label' => 'Renseignez le site web du partenaires (Si possible)',
                'attr' => ['placeholder' => 'le site web du partenaires']
            ])
            ->add('imageFile', VichImageType::class, [
                'required' => false,
                'label' => false,
                'allow_delete' => true,
                'download_uri' => true,
                'image_uri' => true,
                'attr'  => ['data-provide' => 'dropify'],
            ]);
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Partner::class,
        ]);
    }
}
