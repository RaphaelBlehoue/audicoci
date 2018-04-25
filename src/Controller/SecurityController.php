<?php

namespace App\Controller;

use App\Entity\Users;
use App\Form\RegisterType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * Class SecurityController
 * @package App\Controller
 */
class SecurityController extends Controller
{

    /**
     * @Route("/secure/signin", name="signin_page")
     * @param Request $request
     * @param AuthenticationUtils $authenticationUtils
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function login(Request $request, AuthenticationUtils $authenticationUtils)
    {
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();
        return $this->render('security/signin_page.html.twig', [
            'last_username' => $lastUsername,
            'error'         => $error
        ]);
    }

    /**
     * La route pour se deconnecter.
     *
     * Mais celle ci ne doit jamais être executé car symfony l'interceptera avant.
     *
     *
     * @Route("/logout", name="security_logout")
     * @throws \Exception
     */
    public function logout(){
        throw new \Exception('This should never be reached!');
    }

    /**
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return \Symfony\Component\HttpFoundation\Response
     * @Route("/secure/register", name="register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $users = new Users();
        $form = $this->createForm(RegisterType::class, $users);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($users);
            $entityManager->flush();
            $this->authenticateUser($users);
            return $this->redirectToRoute('account', array(), 301);
        }
        return $this->render('security/signup_page.html.twig', [
           'form' => $form->createView()
        ]);
    }

    /**
     * @param Users $users
     */
    private function authenticateUser(Users $users)
    {
        $providerKey = 'main';
        $token = new UsernamePasswordToken($users, null, $providerKey, $users->getRoles());
        $this->container->get('security.token_storage')->setToken($token);
    }
}
