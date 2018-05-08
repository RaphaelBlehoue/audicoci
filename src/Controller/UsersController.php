<?php

namespace App\Controller;

use App\Entity\Users;
use App\Form\UsersEditType;
use App\Form\UsersType;
use App\Repository\UsersRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/users")
 */
class UsersController extends Controller
{
    /**
     * @Route("/", name="users_index", methods="GET", schemes={"%secure_channel%"})
     * @param UsersRepository $usersRepository
     * @return Response
     */
    public function index(UsersRepository $usersRepository): Response
    {
        return $this->render('users/index.html.twig', ['users' => $usersRepository->findAll()]);
    }

    /**
     * @Route("/new", name="users_new", methods="GET|POST", schemes={"%secure_channel%"})
     * @param Request $request
     * @return Response
     */
    public function new(Request $request): Response
    {
        $user = new Users();
        $form = $this->createForm(UsersType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $user->setRoles(['ROLE_ADMIN']);
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('users_index');
        }

        return $this->render('users/new.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="users_show", methods="GET", schemes={"%secure_channel%"})
     * @param Users $user
     * @return Response
     */
    public function show(Users $user): Response
    {
        return $this->render('users/show.html.twig', ['user' => $user]);
    }

    /**
     * @Route("/{id}/edit", name="users_edit", methods="GET|POST", schemes={"%secure_channel%"})
     * @Security("is_granted('ROLE_USER')")
     * @param Request $request
     * @param Users $user
     * @return Response
     */
    public function edit(Request $request, Users $user): Response
    {
        $form = $this->createForm(UsersEditType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            return $this->redirectToRoute('users_index');
        }
        return $this->render('users/edit.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="users_delete", methods="DELETE", schemes={"%secure_channel%"})
     * @param Request $request
     * @param Users $user
     * @return Response
     */
    public function delete(Request $request, Users $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($user);
            $em->flush();
        }
        return $this->redirectToRoute('users_index');
    }
}
