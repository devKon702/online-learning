package com.ktpm.service;

import com.ktpm.Helper;
import com.ktpm.dao.DeckDao;
import com.ktpm.dto.DeckDto;
import com.ktpm.dto.LDeckDto;
import com.ktpm.entity.Deck;
import com.ktpm.entity.User;
import com.ktpm.request.DeckRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeckService {

    private final DeckDao deckDao;
    private final Helper helper;


    public LDeckDto createDeck(DeckRequest deckRequest)  {
        User user = helper.getUser();
        Deck deck = Deck.builder()
                .name(deckRequest.getName())
                .description(deckRequest.getDescription())
                .createAt(helper.formatDate(new Date()))
                .user(user)
                .build();
        return new LDeckDto(deckDao.save(deck));
    }


    public List<LDeckDto> getDesks() {
        String emailUser = helper.getEmailUser();
        List<Deck> decks = deckDao.findByUserEmail(emailUser);
        List<LDeckDto> decksDto = new ArrayList<>();
        decks.forEach(deck -> {
            decksDto.add(new LDeckDto(deck));
        });
        return decksDto;
    }

    public LDeckDto deleteDeck(Integer id)  {
        String emailUser = helper.getEmailUser();
        Deck deck = deckDao.findFirstByIdAndUserEmail(id, emailUser).orElseThrow();
        deckDao.delete(deck);
        return new LDeckDto(deck);
    }

    public LDeckDto updateDeck(Integer id, DeckRequest deckRequest)  {
        String emailUser = helper.getEmailUser();
        Deck deck = deckDao.findFirstByIdAndUserEmail(id, emailUser).orElseThrow();
        if (deckRequest.getName() != null) {
            deck.setName(deckRequest.getName());
        }
        if (deckRequest.getDescription() != null) {
            deck.setDescription(deckRequest.getDescription());
        }
        return new LDeckDto(deckDao.save(deck));
    }

    public DeckDto getDeckWithId(Integer id) {
        String emailUser = helper.getEmailUser();
        Deck deck = deckDao.findFirstByIdAndUserEmail(id, emailUser).orElseThrow();
        return new DeckDto(deck);
    }

    public List<LDeckDto> searchDecks(String searchTerm) {
        String emailUser = helper.getEmailUser();
        List<Deck> decks = deckDao.search(emailUser, searchTerm);
        List<LDeckDto> decksDto = new ArrayList<>();
        decks.forEach(deck -> decksDto.add(new LDeckDto(deck)));
        return decksDto;
    }
}
