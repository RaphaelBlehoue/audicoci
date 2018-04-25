<?php
/**
 * Created by IntelliJ IDEA.
 * User: raphael
 * Date: 13/04/2018
 * Time: 20:32
 */

namespace App\EventListener\Security;


use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class LoginListener
{

    /**
     * @var EntityManagerInterface
     */
    private $manager;

    /**
     * LoginListener constructor.
     * @param EntityManagerInterface $manager
     */
    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @param InteractiveLoginEvent $event
     */
    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event)
    {
        $user = $event->getAuthenticationToken()->getUser();
        if (!$user instanceof Users){
            return;
        }
        $user->setLastLogin(new \DateTime());
        $this->manager->persist($user);
        $this->manager->flush();
    }
}