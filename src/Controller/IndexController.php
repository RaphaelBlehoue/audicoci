<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Event;
use App\Entity\Filiere;
use App\Entity\Formation;
use App\Entity\Section;
use App\Repository\CategoryRepository;
use App\Repository\FiliereRepository;
use App\Repository\PartnerRepository;
use App\Repository\PostRepository;
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
     * @param PostRepository $postRepository
     * @param PartnerRepository $partnerRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(
        CategoryRepository $categoryRepository,
        EventRepository $eventRepository,
        PostRepository $postRepository,
        PartnerRepository $partnerRepository
    )
    {
        $categories = $categoryRepository->findAll();
        $events = $eventRepository->getValidEventLimited(3, new \DateTime('now'));
        $posts = $postRepository->getPostLimited(10);
        $partners = $partnerRepository->findAll();
        return $this->render('index/index.html.twig', [
            'categories' => $categories,
            'events'     => $events,
            'posts'      => $posts,
            'partners'   => $partners
        ]);
    }

    /**
     * @Route("/notre-philosophie", name="page_philosophie", methods="GET", schemes={"%secure_channel%"})
     * @param PartnerRepository $partnerRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function pagephilosophie(PartnerRepository $partnerRepository){
        $partners = $partnerRepository->findAll();
        return $this->render('pages/philosophie.html.twig',[
            'partners' => $partners
        ]);
    }

    /**
     * @Route("/about_us", name="page_about", methods="GET", schemes={"%secure_channel%"})
     * @param PartnerRepository $partnerRepository
     * @param PostRepository $postRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function aboutsUs(PartnerRepository $partnerRepository, PostRepository $postRepository){
        $partners = $partnerRepository->findAll();
        $posts = $postRepository->getPostLimited(10);
        return $this->render('pages/abouts_us.html.twig',[
            'posts'      => $posts,
            'partners' => $partners
        ]);
    }

    /**
     * @Route("/our_services", name="page_services", methods="GET", schemes={"%secure_channel%"})
     * @param CategoryRepository $categoryRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function ServicePage(CategoryRepository $categoryRepository){
        $categories = $categoryRepository->findAll();
        return $this->render('pages/services.html.twig',[
            'categories' => $categories
        ]);
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
     * @param FiliereRepository $filiereRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function learningPage(FiliereRepository $filiereRepository, EventRepository $eventRepository){
        $filieres = $filiereRepository->findAll();
        $events = $eventRepository->getValidEventLimited(3, new \DateTime('now'));
        return $this->render('pages/learning.html.twig',[
            'filieres' => $filieres,
            'events'   => $events
        ]);
    }

    /**
     * @Route("/our_learning/page/{slug}", name="page_learning_group", methods="GET", schemes={"%secure_channel%"})
     * @param Filiere $filiere
     * @param FiliereRepository $filiereRepository
     * @param $slug
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function learningPageGroups(Filiere $filiere, FiliereRepository $filiereRepository){
        dump($filiere);
        return $this->render('pages/learning_filiere.html.twig');
    }

    /**
     * @Route("/learning/{slug}", name="page_learning_detail", methods="GET", schemes={"%secure_channel%"})
     * @param Formation $formation
     * @param FormationRepository $formationRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function learningPageDetail(Formation $formation, FormationRepository $formationRepository){
        dump($formation);
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
     * @param PostRepository $postRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function BlogPage(PostRepository $postRepository){
        $posts = $postRepository->getPostLimited(30);
        return $this->render('pages/blog.html.twig',[
            'posts'=> $posts
        ]);
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
