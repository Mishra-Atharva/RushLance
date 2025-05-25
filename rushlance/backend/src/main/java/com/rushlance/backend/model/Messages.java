package com.rushlance.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "sender_id")
    @JsonProperty("sender_id")
    private int sender_id;

    @Column(name = "receiver_id")
    @JsonProperty("receiver_id")
    private int receiver_id;

    @Column(name = "content")
    @JsonProperty("content")
    private String content;

    @Column(name = "sent_at")
    @CreationTimestamp
    private OffsetDateTime sent_at;

    @Column(name = "is_read")
    @JsonProperty("is_read")
    private boolean is_read;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getSender_id() {
        return sender_id;
    }

    public void setSender_id(int sender_id) {
        this.sender_id = sender_id;
    }

    public int getReceiver_id() {
        return receiver_id;
    }

    public void setReceiver_id(int receiver_id) {
        this.receiver_id = receiver_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public OffsetDateTime getSent_at() {
        return sent_at;
    }

    public void setSent_at(OffsetDateTime sent_at) {
        this.sent_at = sent_at;
    }

    public boolean isIs_read() {
        return is_read;
    }

    public void setIs_read(boolean is_read) {
        this.is_read = is_read;
    }

    @Override
    public String toString() {
        return "Messages{" +
                "id=" + id +
                ", sender_id=" + sender_id +
                ", receiver_id=" + receiver_id +
                ", content='" + content + '\'' +
                ", sent_at=" + sent_at +
                ", is_read=" + is_read +
                '}';
    }
}
