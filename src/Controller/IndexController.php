<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Event;
use App\Entity\Formation;
use App\Entity\Section;
use App\Repository\CategoryRepository;
use App\Repository\EventRepository;
use App\Repository\FormationRepository;
use App\Repository\SectionRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
{
    /**
     * @Route("/", name="index_page", methods="GET", schemes={"%secure_channel%"})
     * @param CategoryRepository $categoryRepository
     * @param EventRepository $eventRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(CategoryRepository $categoryRepository, EventRepository $eventRepository)
    {
        $categories = $categoryRepository->findAll();
        $events = $eventRepository->getValidEventLimited(3, new \DateTime('now'));
        return $this->render('index/index.html.twig', [
            'categories' => $categories,
            'events'     => $events
        ]);
    }

    /**
     * @Route("/notre-philosophie", name="page_philosophie", methods="GET", schemes={"%secure_channel%"})
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function pagephilosophie(){
        return $this->render('pages/philosophie.html.twig');
    }

    /**
     * @Route("/about_us", name="page_about", methods="GET", schemes={"%secure_channel%"})
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function aboutsUs(){
        return $this->render('pages/abouts_us.html.twig');
    }

    /**
     * @Route("/our_services", name="page_services", methods="GET", schemes={"%secure_channel%"})
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function ServicePage(){
        return $this->render('pages/services.html.twig');
    }

    /**
     * @Route("/our_services/page/{id}/{slug}/detail", name="page_services_group", methods="GET", schemes={"%secure_channel%"})
     * @param Category $category
     * @param CategoryRepository $categoryRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function ServicePageGroups(Category $category, CategoryRepository $categoryRepository, $slug){
        return $this->render('pages/services_category.html.twig');
    }

    /**
     * @Route("/services/{slug}", name="page_services_detail", methods="GET", schemes={"%secure_channel%"})
     * @param Section $section
     * @param SectionRepository $sectionRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function ServicePageDetail(Section $section, SectionRepository $sectionRepository){
        return $this->render('pages/services_detail.html.twig');
    }

    /**
     * @Route("/our_learning", name="page_learning", methods="GET", schemes={"%secure_channel%"})
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function learningPage(){
        return $this->render('pages/learning.html.twig');
    }

    /**
     * @Route("/learning/{slug}", name="page_learning_detail", methods="GET", schemes={"%secure_channel%"})
     * @param Formation $formation
     * @param FormationRepository $formationRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function learningPageDetail(Formation $formation, FormationRepository $formationRepository){
        return $this->render('pages/learning_detail.html.twig');
    }

    /**
     * @Route("/event/{slug}", name="page_event_detail", methods="GET", schemes={"%secure_channel%"})
     * @param Event $event
     * @param EventRepository $eventRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function eventPageDetail(Event $event, EventRepository $eventRepository){
        return $this->render('pages/event_detail.html.twig');
    }

    /**
     * @Route("/blog", name="page_blog", methods="GET", schemes={"%secure_channel%"})
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function BlogPage(){
        return $this->render('pages/blog.html.twig');
    }

    /**
     * @Route("/blog/{slug}", name="page_blog_detail", methods="GET", schemes={"%secure_channel%"})
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function BlogPageDetail(){
        return $this->render('pages/blog_detail.html.twig');
    }

    /**
     * @Route("/our_contact/", name="page_contact", methods="GET", schemes={"%secure_channel%"})
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function ContactPage(){
        return $this->render('pages/contact.html.twig');
    }
}
