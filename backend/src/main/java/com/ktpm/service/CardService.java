package com.ktpm.service;

import com.ktpm.Helper;
import com.ktpm.dao.CardDao;
import com.ktpm.dao.DeckDao;
import com.ktpm.dto.CardDto;
import com.ktpm.entity.Card;
import com.ktpm.entity.Deck;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardDao cardDao;
    private final DeckDao deckDao;
    private final Helper helper;
    private final FirebaseStorageService firebaseStorageService;


    public CardDto createCard(Integer idDeck, String term, String definition, String example,
                              MultipartFile image, MultipartFile audio) throws Exception {

        String emailUser = helper.getEmailUser();
        Optional<Deck> oDeck = deckDao.findFirstByIdAndUserEmail(idDeck, emailUser);

        if(oDeck.isEmpty()) {
            throw new Exception("Not found");
        }
        Deck deck =  oDeck.get();



        String imageUrl = image != null ? firebaseStorageService.save("image", image) : null;
        String audioUrl = audio != null ? firebaseStorageService.save("audio", audio) : null;

        Card card = Card.builder()
                .term(term)
                .definition(definition)
                .example(example)
                .image(imageUrl)
                .audio(audioUrl)
                .createAt(helper.formatDate(new Date()))
                .isFavourite(false)
                .isRemembered(false)
                .deck(deck)
                .build();

        return new CardDto(cardDao.save(card));
    }



    public CardDto updateCard(Integer id, Integer idDeck, String term, String definition,
                              String example, MultipartFile image, MultipartFile audio,
                              Boolean isFavourite, Boolean isRemembered) throws Exception {
        String emailUser = helper.getEmailUser();
        Card card = cardDao.findFirstByIdAndDeckUserEmail(id, emailUser).orElseThrow();
        if (idDeck != null) {
            Deck deck = deckDao.findById(idDeck).orElseThrow();
            card.setDeck(deck);
        }
        if (image != null ) {
            card.setImage(firebaseStorageService.save("image", image));
        }
        if (audio != null) {
            card.setAudio(firebaseStorageService.save("audio", audio));
        }
        if (term != null) {
            card.setTerm(term);
        }
        if (definition != null) {
            card.setDefinition(definition);
        }
        if (example != null) {
            card.setExample(example);
        }
        if (isRemembered != null) {
            card.setIsRemembered(isRemembered);
        }
        if (isFavourite != null) {
            card.setIsFavourite(isFavourite);
        }
        return new CardDto(cardDao.save(card));
    }

    public CardDto deleteCard(Integer id)  {
        String emailUser = helper.getEmailUser();
        Card card = cardDao.findFirstByIdAndDeckUserEmail(id, emailUser).orElseThrow();
        cardDao.delete(card);
        return new CardDto(card);
    }

    public CardDto getCardWithId(Integer id) {
        String emailUser = helper.getEmailUser();
        Card card = cardDao.findFirstByIdAndDeckUserEmail(id, emailUser).orElseThrow();
        return new CardDto(card);
    }

    public List<CardDto> getCards() {
        String emailUser = helper.getEmailUser();
        List<Card> cards = cardDao.findByDeckUserEmail(emailUser);
        List<CardDto> cardsDto = new ArrayList<>();
        cards.forEach(card -> cardsDto.add(new CardDto(card)));
        return cardsDto;
    }

    public List<CardDto> searchCards(String searchTerm) {
        String emailUser = helper.getEmailUser();
        List<Card> cards = cardDao.search(emailUser, searchTerm);
        List<CardDto> cardsDto = new ArrayList<>();
        cards.forEach(card -> cardsDto.add(new CardDto(card)));
        return cardsDto;
    }

    public List<CardDto> filterCards(Integer idDeck, Boolean isFavourite, Boolean isRemembered) {
        String emailUser = helper.getEmailUser();
        List<Card> cards = cardDao.filter(emailUser, idDeck, isFavourite, isRemembered);
        List<CardDto> cardsDto = new ArrayList<>();
        cards.forEach(card -> cardsDto.add(new CardDto(card)));
        return cardsDto;
    }

    // xóa không trả về gì cả.
    public void deleteCards(int [] ids) {
        String emailUser = helper.getEmailUser();
        for (int id : ids) {
            Card card = cardDao.findFirstByIdAndDeckUserEmail(id, emailUser).orElseThrow();
            cardDao.delete(card);
        }
    }
}

// lớp học: group
// bộ thẻ: => thành viên trong lớp học chia sẻ với nhau.

