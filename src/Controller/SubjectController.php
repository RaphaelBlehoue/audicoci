<?php

namespace App\Controller;

use App\Entity\Subject;
use App\Form\SubjectType;
use App\Repository\SubjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/subject")
 */
class SubjectController extends Controller
{
    /**
     * @Route("/", name="subject_index", methods="GET")
     * @param SubjectRepository $subjectRepository
     * @return Response
     */
    public function index(SubjectRepository $subjectRepository): Response
    {
        return $this->render('subject/index.html.twig', ['subjects' => $subjectRepository->findAll()]);
    }

    /**
     * @Route("/new", name="subject_new", methods="GET|POST")
     * @param Request $request
     * @return Response
     */
    public function new(Request $request): Response
    {
        $subject = new Subject();
        $form = $this->createForm(SubjectType::class, $subject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($subject);
            $em->flush();

            return $this->redirectToRoute('subject_index');
        }

        return $this->render('subject/new.html.twig', [
            'subject' => $subject,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="subject_show", methods="GET")
     * @param Subject $subject
     * @return Response
     */
    public function show(Subject $subject): Response
    {
        return $this->render('subject/show.html.twig', ['subject' => $subject]);
    }

    /**
     * @Route("/{id}/edit", name="subject_edit", methods="GET|POST")
     * @param Request $request
     * @param Subject $subject
     * @return Response
     */
    public function edit(Request $request, Subject $subject): Response
    {
        $form = $this->createForm(SubjectType::class, $subject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('subject_index');
        }

        return $this->render('subject/edit.html.twig', [
            'subject' => $subject,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="subject_delete", methods="DELETE")
     * @param Request $request
     * @param Subject $subject
     * @return Response
     */
    public function delete(Request $request, Subject $subject): Response
    {
        if ($this->isCsrfTokenValid('delete'.$subject->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($subject);
            $em->flush();
        }

        return $this->redirectToRoute('subject_index');
    }
}
