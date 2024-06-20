package com.ktpm.sendmail;

public interface IEmailService {
    boolean sendSimpleMail(EmailDetail details);
    boolean sendMailWithAttachment(EmailDetail details);
}
