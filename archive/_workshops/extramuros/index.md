---
category: extramuros
layout: default
weight: -9
---

## Extramuros: collaborative live coding and distributed JavaScript visualizations

* David Ogborn, McMaster University
* Eldad Tsabary, Concordia University
* Ian Jarvis, McMaster University
* Alexandra Cárdenas, University of the Arts in Berlin

The extramuros software was developed to explore live coding and
network music, bringing live coding musicians together around shared,
text buffers.  A half-day workshop at ICLC 2015 around extramuros will
be divided into two sections.  The first half of the workshop
introduces the software and leads to a collective jam session in the
Tidal language.  The second half of the workshop is a hack-in around
new possibilities for distributed, live-coded JavaScript
visualizations of collective live coding activity.

### Details

extramuros was developed to explore live coding and network music,
bringing live coding musicians together around shared text buffers. In
it’s basic operation, a server is run on one computer.  Some number of
performers use a web browser to connect to the server and edit shared
buffers of text code, with each person’s editing visible to the
others.  At any computer where the sounding result of the code is
desired (for example, the individual machines in a globally
distributed ensemble), a client application is run that receives
evaluated text from the server and pipes it to the audio programming
language of choice.  The software is released on an ongoing basis
through github.com with a GPL version 3 license.

At ICLC 2015, we will conduct a half-day workshop around the
extramuros software.  In the first part, we will introduce the
software, assist with troubleshooting, and perform a networked jam
session in the Tidal language.  In the second part, we will have a
“hack-in” on new distributed visualization facilities.  These will
allow Open Sound Control messages to the server to arrive back in the
connected web browsers as calls to a JavaScript stub function, which
could be used to give feedback about syntax errors, other aspects of
system state (such as audio levels), or more sophisticated forms of
visualization of live coding activity.  The intent for the hack-in is
to collectively produce some strong examples of JavaScript
visualization of live coding activity, which could potentially be
incorporated into the extramuros codebase as examples for further
development.

Participants are invited to bring their own laptops with WiFi. No
software installation is required as everything to be done in the
workshop can be done through a web browser. Previous exposure to Tidal
and/or JavaScript, while beneficial, is not required and we will
demonstrate basic strategies applicable to both halves of the
workshop.

Software: [https://github.com/d0kt0r0/extramuros]     
Example of extramuros in action: [https://www.youtube.com/watch?v=zLR02FQDqOM]
