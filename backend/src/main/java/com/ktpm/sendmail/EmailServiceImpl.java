package com.ktpm.sendmail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements IEmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;
    @Override
    public boolean sendSimpleMail(EmailDetail details) {
        // Try block to check for exceptions
        try {

            // Creating a simple mail message
            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            javaMailSender.send(mailMessage);
            //return "Mail Sent Successfully...";
            return true;
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            System.out.println(e.getMessage());
            //return "Error while Sending Mail";
            return false;
        }
    }

    @Override
    public boolean sendMailWithAttachment(EmailDetail details) {
        // Creating a mime message
        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            //mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setText(details.getMsgBody(), true);

            mimeMessageHelper.setSubject(
                    details.getSubject());

            // Adding the attachment
//            FileSystemResource file
//                    = new FileSystemResource(
//                    new File(details.getAttachment()));
//
//            mimeMessageHelper.addAttachment(
//                    file.getFilename(), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            //return "Mail sent Successfully";
            return true;
        }

        // Catch block to handle MessagingException
        catch (MessagingException e) {
            System.out.println(e.getMessage());
            // Display message when exception occurred
//            return "Error while sending mail!!!";
            return false;
        }
    }
}
