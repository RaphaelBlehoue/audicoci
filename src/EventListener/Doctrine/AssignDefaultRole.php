<?php
/**
 * Created by IntelliJ IDEA.
 * User: raphael
 * Date: 30/04/2018
 * Time: 22:09
 */

namespace App\EventListener\Doctrine;


use App\Entity\UserRole;
use App\Entity\Users;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Bridge\Doctrine\RegistryInterface;

class AssignDefaultRole implements EventSubscriber
{


    /**
     * @var RegistryInterface
     */
    private $registry;

    public function __construct(RegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return array
     */
    public function getSubscribedEvents()
    {
        return ['prePersist'];
    }

    /**
     * @param LifecycleEventArgs $eventArgs
     */
    public function prePersist(LifecycleEventArgs $eventArgs){
        $entity = $eventArgs->getEntity();
        if (!$entity instanceof Users){
            return;
        }
        if (!$this->getDefaultRole() instanceof UserRole){
            return;
        }
        $entity->addRole($this->getDefaultRole());
    }

    /**
     * @return \App\Entity\UserRole|array|null
     */
    private function getDefaultRole(){
        $roles = $this->registry->getRepository(UserRole::class)->findOneBy([
             'roleName' => 'ROLE_USER'
        ]);
        if ($roles === null){
            return ['ROLE_USER'];
        }
        return $roles;
    }
}