<?php
/**
 * Created by IntelliJ IDEA.
 * User: raphael
 * Date: 13/04/2018
 * Time: 15:29
 */

namespace App\EventListener\Doctrine;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use App\Entity\Users;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class HashPasswordListener implements EventSubscriber
{


    /**
     * @var UserPasswordEncoderInterface
     */
    private $userPasswordEncoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }


    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return array
     */
    public function getSubscribedEvents()
    {
        return ['prePersist', 'preUpdate'];
    }


    /**
     * @param LifecycleEventArgs $eventArgs
     */
    public function prePersist(LifecycleEventArgs $eventArgs)
    {
        $entity = $eventArgs->getEntity();
        if (!$entity instanceof Users) {
            return;
        }
        $this->encodePassword($entity);
    }


    public function preUpdate(LifecycleEventArgs $eventArgs)
    {
        $entity = $eventArgs->getEntity();
        if (!$entity instanceof Users) {
            return;
        }
        $this->encodePassword($entity);
        $em = $eventArgs->getEntityManager();
        $meta = $em->getClassMetadata(get_class($entity));
        $em->getUnitOfWork()->recomputeSingleEntityChangeSet($meta, $entity);
    }


    /**
     * @param Users $entity
     */
    private function encodePassword(Users $entity)
    {
        if (!$entity->getPlainPassword()) {
            return;
        }
        $encoded = $this->userPasswordEncoder->encodePassword(
            $entity,
            $entity->getPlainPassword()
        );
        $entity->setPassword($encoded);
    }
}