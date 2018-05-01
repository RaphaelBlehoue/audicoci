<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
{
    /**
     * @Route("/", name="index_page", schemes={"%secure_channel%"})
     */
    public function index()
    {
        return $this->render('index/index.html.twig');
    }
}
