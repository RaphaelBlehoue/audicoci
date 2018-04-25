<?php
/**
 * Created by IntelliJ IDEA.
 * User: raphael
 * Date: 12/04/2018
 * Time: 20:44
 */

namespace App;


final class AppEvents
{
    /**
     * @Event("App\Event\UserEvent")
     */
    const APP_AUTO_LOGGED_USER = "app.auto_logged_user";

    /**
     * @Event(App\Event\UserEvent)
     */
    const APP_CHECK_USER_ACTIVED = "app.check_user_actived";
}