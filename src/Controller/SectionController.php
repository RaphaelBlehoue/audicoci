<?php

namespace App\Controller;

use App\Entity\Section;
use App\Form\SectionType;
use App\Repository\SectionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/section")
 */
class SectionController extends Controller
{
    /**
     * @Route("/", name="section_index", methods="GET", schemes={"%secure_channel%"})
     * @param SectionRepository $sectionRepository
     * @return Response
     */
    public function index(SectionRepository $sectionRepository): Response
    {
        return $this->render('section/index.html.twig', ['sections' => $sectionRepository->findAll()]);
    }

    /**
     * @Route("/new", name="section_new", methods="GET|POST", schemes={"%secure_channel%"})
     * @param Request $request
     * @return Response
     */
    public function new(Request $request): Response
    {
        $section = new Section();
        $form = $this->createForm(SectionType::class, $section);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($section);
            $em->flush();

            return $this->redirectToRoute('section_index');
        }
        return $this->render('section/new.html.twig', [
            'section' => $section,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="section_show", methods="GET", schemes={"%secure_channel%"})
     * @param Section $section
     * @return Response
     */
    public function show(Section $section): Response
    {
        return $this->render('section/show.html.twig', ['section' => $section]);
    }

    /**
     * @Route("/{id}/edit", name="section_edit", methods="GET|POST", schemes={"%secure_channel%"})
     * @param Request $request
     * @param Section $section
     * @return Response
     */
    public function edit(Request $request, Section $section): Response
    {
        $form = $this->createForm(SectionType::class, $section);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('section_index');
        }
        return $this->render('section/edit.html.twig', [
            'section' => $section,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="section_delete", methods="DELETE", schemes={"%secure_channel%"})
     * @param Request $request
     * @param Section $section
     * @return Response
     */
    public function delete(Request $request, Section $section): Response
    {
        if ($this->isCsrfTokenValid('delete'.$section->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($section);
            $em->flush();
        }
        return $this->redirectToRoute('section_index');
    }
}
