<?php
/**
 * Created by IntelliJ IDEA.
 * User: raphael
 * Date: 12/04/2018
 * Time: 20:49
 */

namespace App\Event;


use App\Entity\Users;
use Symfony\Component\EventDispatcher\Event;

class UserEvent extends Event
{
    protected $user;

    public function __construct(Users $user)
    {
        $this->user = $user;
    }

    /**
     * @return Users
     */
    public function getUser()
    {
        return $this->user;
    }

}